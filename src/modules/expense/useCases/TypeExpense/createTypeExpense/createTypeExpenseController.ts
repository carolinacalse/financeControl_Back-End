import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeExpenseUseCase } from "./createTypeExpenseUseCase";

class CreateTypeExpenseController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum, description} = request.body;

    const createTypeExpenseUseCase = container.resolve(CreateTypeExpenseUseCase);

    await createTypeExpenseUseCase.execute({docNum, description});

    return response.status(200).send();
  }
}

export {CreateTypeExpenseController};
