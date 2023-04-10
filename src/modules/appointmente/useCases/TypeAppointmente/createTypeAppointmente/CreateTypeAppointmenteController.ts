import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeAppointmenteUseCase } from "./CreateTypeAppointmenteUseCase";

class CreateTypeAppointmenteController {
  async handle(request: Request, response: Response) : Promise<Response> {
    /* const {docNum, description, inactive} = request.body; */
    const {docNum, description} = request.body;

    const createTypeAppointmenteUseCase = container.resolve(CreateTypeAppointmenteUseCase);

    await createTypeAppointmenteUseCase.execute({docNum, description});

    return response.status(200).send();
  }
}

export {CreateTypeAppointmenteController};
