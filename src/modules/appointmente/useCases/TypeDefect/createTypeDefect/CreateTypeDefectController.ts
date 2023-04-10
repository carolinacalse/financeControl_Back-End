import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeDefectUseCase } from "./CreateTypeDefectUseCase";

class CreateTypeDefectController {
  async handle(request: Request, response: Response) : Promise<Response> {
    /* const {docNum, description, inactive} = request.body; */
    const {docNum, description} = request.body;

    const createTypeDefectUseCase = container.resolve(CreateTypeDefectUseCase);

    await createTypeDefectUseCase.execute({docNum, description});

    return response.status(200).send();
  }
}

export {CreateTypeDefectController};
