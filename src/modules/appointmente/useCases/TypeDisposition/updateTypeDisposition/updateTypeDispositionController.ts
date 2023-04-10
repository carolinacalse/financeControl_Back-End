import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeDispositionUseCase } from "./updateTypeDispositionUseCase";

class UpdateTypeDispositionController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeDisposition_id,
      docNum,
      description,
      inactive
    } = request.body;

    try {
    const updateTypeDispositionController= container.resolve(UpdateTypeDispositionUseCase);

    const types_response = await updateTypeDispositionController.execute({
      typeDisposition_id,
      docNum,
      description,
      inactive
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeDispositionController};
