import {Request, Response} from "express";
import {ListTypeExpenseUseCase} from "./ListTypeExpenseUseCase";
import {container} from "tsyringe";

class ListTypeExpenseController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeExpenseUseCase = container.resolve(ListTypeExpenseUseCase);
    const all = await listTypeExpenseUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeExpenseController};
