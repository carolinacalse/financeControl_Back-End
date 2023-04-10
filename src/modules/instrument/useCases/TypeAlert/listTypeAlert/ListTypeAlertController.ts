import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListTypeAlertUseCase } from "./ListTypeAlertUseCase";

class ListTypeAlertController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeAlertUseCase = container.resolve(ListTypeAlertUseCase);
    const all = await listTypeAlertUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeAlertController};
