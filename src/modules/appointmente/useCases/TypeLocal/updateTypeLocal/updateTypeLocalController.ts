import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeLocalUseCase } from "./updateTypeLocalUseCase";

class UpdateTypeLocalController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeLocal_id,
      docNum,
      group,
      subgroup,
      type,
      inactive
    } = request.body;

    try {
    const updateTypeLocalController= container.resolve(UpdateTypeLocalUseCase);

    const types_response = await updateTypeLocalController.execute({
      typeLocal_id,
      docNum,
      group,
      subgroup,
      type,
      inactive
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeLocalController};
