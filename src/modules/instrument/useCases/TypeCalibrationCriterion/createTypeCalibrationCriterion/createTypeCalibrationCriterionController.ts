import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeCalibrationCriterionUseCase } from "./createTypeCalibrationCriterionUseCase";

class CreateTypeCalibrationCriterionController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {criterion_id,
      typeCalibration_id,
      description,
      value,
      statusLine,
      uncertainty,
      error,
      amount} = request.body;

    const createTypeCalibrationCriterionUseCase = container.resolve(CreateTypeCalibrationCriterionUseCase);

    await createTypeCalibrationCriterionUseCase.execute({
      criterion_id,
      typeCalibration_id,
      description,
      value,
      statusLine,
      uncertainty,
      error,
      amount});

    return response.status(200).send();
  }
}

export {CreateTypeCalibrationCriterionController};
