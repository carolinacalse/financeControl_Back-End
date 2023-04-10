import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeCalibrationUseCase } from "./updateTypeCalibrationUseCase";

class UpdateTypeCalibrationController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeCalibration_id,
      docNum,
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
    } = request.body;

    try {
    const updateTypeCalibrationController= container.resolve(UpdateTypeCalibrationUseCase);

    const types_response = await updateTypeCalibrationController.execute({
      typeCalibration_id,
      docNum,
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
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeCalibrationController};
