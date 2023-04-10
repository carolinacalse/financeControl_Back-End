import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeDefectUseCase } from "./updateTypeDefectUseCase";

class UpdateTypeDefectController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeDefect_id,
      docNum,
      description,
      inactive
    } = request.body;

    try {
    const updateTypeDefectController= container.resolve(UpdateTypeDefectUseCase);

    const types_response = await updateTypeDefectController.execute({
      typeDefect_id,
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
export {UpdateTypeDefectController};
