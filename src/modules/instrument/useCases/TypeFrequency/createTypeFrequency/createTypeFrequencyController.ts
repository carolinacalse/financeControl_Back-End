import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeFrequencyUseCase } from "./createTypeFrequencyUseCase";

class CreateTypeFrequencyController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum, description} = request.body;

    const createTypeFrequencyUseCase = container.resolve(CreateTypeFrequencyUseCase);

    await createTypeFrequencyUseCase.execute({docNum, description});

    return response.status(200).send();
  }
}

export {CreateTypeFrequencyController};
