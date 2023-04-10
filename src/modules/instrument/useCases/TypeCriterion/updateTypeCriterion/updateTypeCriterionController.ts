import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeCriterionUseCase } from "./updateTypeCriterionUseCase";

class UpdateTypeCriterionController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeCriterion_id,
      docNum,
      description,
      value,
      inactive
    } = request.body;

    try {
    const updateTypeCriterionController= container.resolve(UpdateTypeCriterionUseCase);

    const types_response = await updateTypeCriterionController.execute({
      typeCriterion_id,
      docNum,
      description,
      value,
      inactive
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeCriterionController};
