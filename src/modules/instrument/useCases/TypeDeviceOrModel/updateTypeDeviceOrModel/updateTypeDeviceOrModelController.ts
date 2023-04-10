import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeDeviceOrModelUseCase } from "./updateTypeDeviceOrModelUseCase";

class UpdateTypeDeviceOrModelController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeDeviceOrModel_id,
      item,
      device_id,
      model_id
    } = request.body;

    try {
    const updateTypeDeviceOrModelController= container.resolve(UpdateTypeDeviceOrModelUseCase);

    const types_response = await updateTypeDeviceOrModelController.execute({
      typeDeviceOrModel_id,
      item,
      device_id,
      model_id
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeDeviceOrModelController};
