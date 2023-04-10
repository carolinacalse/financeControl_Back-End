import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeRangeUseUseCase } from "./createTypeRangeUseUseCase";

class CreateTypeRangeUseController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum, minimum, maximum} = request.body;

    const createTypeRangeUseUseCase = container.resolve(CreateTypeRangeUseUseCase);

    await createTypeRangeUseUseCase.execute({docNum, minimum, maximum});

    return response.status(200).send();
  }
}

export {CreateTypeRangeUseController};
