import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeCriterionUseCase } from "./createTypeCriterionUseCase";

class CreateTypeCriterionController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum, description, value} = request.body;

    const createTypeCriterionUseCase = container.resolve(CreateTypeCriterionUseCase);

    await createTypeCriterionUseCase.execute({docNum, description, value});

    return response.status(200).send();
  }
}

export {CreateTypeCriterionController};
