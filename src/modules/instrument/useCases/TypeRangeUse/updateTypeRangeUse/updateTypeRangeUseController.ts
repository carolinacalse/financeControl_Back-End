import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeRangeUseUseCase } from "./updateTypeRangeUseUseCase";

class UpdateTypeRangeUseController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeRangeUse_id,
      docNum,
      minimum,
      maximum,
      inactive
    } = request.body;

    try {
    const updateTypeRangeUseController= container.resolve(UpdateTypeRangeUseUseCase);

    const types_response = await updateTypeRangeUseController.execute({
      typeRangeUse_id,
      docNum,
      minimum,
      maximum,
      inactive
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeRangeUseController};
