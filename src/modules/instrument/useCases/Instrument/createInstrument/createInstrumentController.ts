import {Request, Response} from "express";
import {container} from "tsyringe"
import { CreateInstrumentUseCase } from "./createInstrumentUseCase";

class CreateInstrumentController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
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
      criterions
    } = request.body;

    try {

      const createInstrumentUseCase = container.resolve(CreateInstrumentUseCase);

      const create = await createInstrumentUseCase.execute({

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
        criterions
      })
      return response.status(201).json({create});
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
 export {CreateInstrumentController}
