import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListTypeCalibrationUseCase } from "./ListTypeCalibrationUseCase";

class ListTypeCalibrationController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeCalibrationUseCase = container.resolve(ListTypeCalibrationUseCase);
    const all = await listTypeCalibrationUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeCalibrationController};
