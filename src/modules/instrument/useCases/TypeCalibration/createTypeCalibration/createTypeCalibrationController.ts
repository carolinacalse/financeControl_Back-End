import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeCalibrationUseCase } from "./createTypeCalibrationUseCase";

class CreateTypeCalibrationController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum,
    dateCalibration,
    nextCalibration,
    finalReport,
    type,
    item,
    provider,
    note,
    status,
    id_model,
    id_instrument,
    id_device,
    inactive,
    criterions} = request.body;

    try {
      const createTypeCalibrationUseCase = container.resolve(CreateTypeCalibrationUseCase);

      await createTypeCalibrationUseCase.execute({docNum,
      dateCalibration,
      nextCalibration,
      finalReport,
      type,
      item,
      provider,
      note,
      status,
      id_model,
      id_instrument,
      id_device,
      inactive,
      criterions});

      return response.status(200).send('success');
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export {CreateTypeCalibrationController};
