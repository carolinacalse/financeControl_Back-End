import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeModelUseCase } from "./updateTypeModelUseCase";

class UpdateTypeModelController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeModel_id,
      docNum,
      developed,
      location,
      frequency,
      responsible,
      customer,
      status,
      positionID,
      positionDescription,
      partNumber,
      inactive
    } = request.body;

    try {
    const updateTypeModelController= container.resolve(UpdateTypeModelUseCase);

    const types_response = await updateTypeModelController.execute({
      typeModel_id,
      docNum,
      developed,
      location,
      frequency,
      responsible,
      customer,
      status,
      positionID,
      positionDescription,
      partNumber,
      inactive
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeModelController};
