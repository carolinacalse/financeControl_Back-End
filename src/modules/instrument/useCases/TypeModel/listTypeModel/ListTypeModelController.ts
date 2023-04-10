import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListTypeModelUseCase } from "./ListTypeModelUseCase";

class ListTypeModelController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeModelUseCase = container.resolve(ListTypeModelUseCase);
    const all = await listTypeModelUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeModelController};
