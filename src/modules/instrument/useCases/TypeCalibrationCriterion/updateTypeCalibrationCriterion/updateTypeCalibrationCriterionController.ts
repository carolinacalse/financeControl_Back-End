import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeCalibrationCriterionUseCase } from "./updateTypeCalibrationCriterionUseCase";

class UpdateTypeCalibrationCriterionController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeCalibrationCriterion_id,
      criterion_id,
      typeCalibration_id,
      description,
      value,
      statusLine,
      uncertainty,
      error,
      amount
    } = request.body;

    try {
    const updateTypeCalibrationCriterionController= container.resolve(UpdateTypeCalibrationCriterionUseCase);

    const types_response = await updateTypeCalibrationCriterionController.execute({
      typeCalibrationCriterion_id,
      criterion_id,
      typeCalibration_id,
      description,
      value,
      statusLine,
      uncertainty,
      error,
      amount
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeCalibrationCriterionController};
