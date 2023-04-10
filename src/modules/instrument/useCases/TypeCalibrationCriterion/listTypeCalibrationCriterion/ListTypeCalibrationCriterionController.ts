import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListTypeCalibrationCriterionUseCase } from "./ListTypeCalibrationCriterionUseCase";

class ListTypeCalibrationCriterionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeCalibrationCriterionUseCase = container.resolve(ListTypeCalibrationCriterionUseCase);
    const all = await listTypeCalibrationCriterionUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeCalibrationCriterionController};
