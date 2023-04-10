import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeAppointmenteUseCase } from "./updateTypeAppointmenteUseCase";

class UpdateTypeAppointmenteController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeAppointmente_id,
      docNum,
      description,
      inactive
    } = request.body;

    try {
    const updateTypeAppointmenteController= container.resolve(UpdateTypeAppointmenteUseCase);

    const types_response = await updateTypeAppointmenteController.execute({
      typeAppointmente_id,
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
export {UpdateTypeAppointmenteController};
