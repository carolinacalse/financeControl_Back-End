import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeFrequencyUseCase } from "./updateTypeFrequencyUseCase";

class UpdateTypeFrequencyController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeFrequency_id,
      docNum,
      description,
      inactive
    } = request.body;

    try {
    const updateTypeFrequencyController= container.resolve(UpdateTypeFrequencyUseCase);

    const types_response = await updateTypeFrequencyController.execute({
      typeFrequency_id,
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
export {UpdateTypeFrequencyController};
