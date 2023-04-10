import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateInstrumentUseCase } from "./updateInstrumentUseCase";

class UpdateInstrumentController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      id_instrument,
      docNum,
      description,
      note ,
      status ,
      frequency ,
      localization ,
      responsible,
      acquisition,
      itemCodePurchase,
      itemCodeService,
      inactive,
      criterions,
    } = request.body;

    try {
    const updateInstrumentController= container.resolve(UpdateInstrumentUseCase);

    const instruments_response = await updateInstrumentController.execute({
      id_instrument,
      docNum,
      description,
      note ,
      status ,
      frequency ,
      localization ,
      responsible,
      acquisition,
      itemCodePurchase,
      itemCodeService,
      inactive,
      criterions,
    });
    return response.status(201).json(instruments_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateInstrumentController};
