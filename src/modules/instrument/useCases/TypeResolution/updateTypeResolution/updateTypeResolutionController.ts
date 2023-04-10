import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeResolutionUseCase } from "./updateTypeResolutionUseCase";

class UpdateTypeResolutionController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeResolution_id,
      docNum,
      description,
      inactive
    } = request.body;

    try {
    const updateTypeResolutionController= container.resolve(UpdateTypeResolutionUseCase);

    const types_response = await updateTypeResolutionController.execute({
      typeResolution_id,
      docNum,
      description,
      inactive
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeResolutionController};
