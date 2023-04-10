import {Request, Response} from "express";
import {ListTypeActionUseCase} from "./ListTypeActionUseCase";
import {container} from "tsyringe";

class ListTypeActionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeActionUseCase = container.resolve(ListTypeActionUseCase);
    const all = await listTypeActionUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeActionController};
