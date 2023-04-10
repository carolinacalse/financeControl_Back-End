import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeDeviceUseCase } from "./updateTypeDeviceUseCase";

class UpdateTypeDeviceController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeDevice_id,
      docNum,
      developed,
      location,
      responsible,
      customer,
      frequency,
      status,
      partNumber,
      criterion,
      note,
      inactive,
      positionID,
      positionDescription
    } = request.body;

    try {
    const updateTypeDeviceController= container.resolve(UpdateTypeDeviceUseCase);

    const types_response = await updateTypeDeviceController.execute({
      typeDevice_id,
      docNum,
      developed,
      location,
      responsible,
      frequency,
      customer,
      status,
      partNumber,
      criterion,
      note,
      inactive,
      positionID,
      positionDescription
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeDeviceController};
