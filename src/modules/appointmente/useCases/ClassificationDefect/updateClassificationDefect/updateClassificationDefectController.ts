import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateClassificationDefectUseCase } from "./updateClassificationDefectUseCase";

class UpdateClassificationDefectController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      classificationDefect_id,
      docNum,
      description,
      level,
      inactive
    } = request.body;

    try {
    const updateClassificationDefectController = container.resolve(UpdateClassificationDefectUseCase);

    const types_response = await updateClassificationDefectController.execute({
      classificationDefect_id,
      docNum,
      description,
      level,
      inactive
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateClassificationDefectController};
