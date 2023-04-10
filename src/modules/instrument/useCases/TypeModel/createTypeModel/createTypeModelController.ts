import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeModelUseCase } from "./createTypeModelUseCase";

class CreateTypeModelController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum, developed, frequency, location, responsible, customer, status, positionID, positionDescription, partNumber} = request.body;

    const createTypeModelUseCase = container.resolve(CreateTypeModelUseCase);

    await createTypeModelUseCase.execute({docNum, developed, frequency, location, responsible, customer, status, positionID, positionDescription, partNumber});

    return response.status(200).send();
  }
}

export {CreateTypeModelController};
