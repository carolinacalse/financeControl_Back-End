import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateCriterionUseCase } from "./updateCriterionUseCase";

class UpdateCriterionController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      criterion_id,
      typeCriterion,
      acceptanceCriterion,
      resolution,
      rangeUse ,
      instrument_id,
    } = request.body;

    try {
    const updateCriterionController= container.resolve(UpdateCriterionUseCase);

    const types_response = await updateCriterionController.execute({
      criterion_id,
      typeCriterion,
      acceptanceCriterion,
      resolution,
      rangeUse ,
      instrument_id,
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateCriterionController};
