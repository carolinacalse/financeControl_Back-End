import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeLocalUseCase } from "./CreateTypeLocalUseCase";

class CreateTypeLocalController {
  async handle(request: Request, response: Response) : Promise<Response> {
    /* const {docNum, group, subgroup, type, inactive} = request.body; */
    const {docNum, group, subgroup, type} = request.body;

    const createTypeLocalUseCase = container.resolve(CreateTypeLocalUseCase);

    await createTypeLocalUseCase.execute({docNum, group, subgroup, type});

    return response.status(200).send();
  }
}

export {CreateTypeLocalController};
