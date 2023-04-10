import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeAlertUseCase } from "./updateTypeAlertUseCase";

class UpdateTypeAlertController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeAlert_id,
      docNum,
      partNumber,
      type,
      process,
      id_file,
      inactive
    } = request.body;

    try {
    const updateTypeAlertController= container.resolve(UpdateTypeAlertUseCase);

    const types_response = await updateTypeAlertController.execute({
      typeAlert_id,
      docNum,
      partNumber,
      type,
      process,
      id_file,
      inactive
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeAlertController};
