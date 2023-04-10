import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeResolutionUseCase } from "./createTypeResolutionUseCase";

class CreateTypeResolutionController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum, description} = request.body;

    const createTypeResolutionUseCase = container.resolve(CreateTypeResolutionUseCase);

    await createTypeResolutionUseCase.execute({docNum, description});

    return response.status(200).send();
  }
}

export {CreateTypeResolutionController};
