import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeDispositionUseCase } from "./CreateTypeDispositionUseCase";
class CreateTypeDispositionController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum, description} = request.body;

    const createTypeDispositionUseCase = container.resolve(CreateTypeDispositionUseCase);

    await createTypeDispositionUseCase.execute({docNum, description});

    return response.status(200).send();
  }
}

export {CreateTypeDispositionController};
