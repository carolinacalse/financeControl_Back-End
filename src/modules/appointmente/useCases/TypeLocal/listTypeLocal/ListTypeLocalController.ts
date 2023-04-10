import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListTypeLocalUseCase } from "./ListTypeLocalUseCase";

class ListTypeLocalController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeLocalUseCase = container.resolve(ListTypeLocalUseCase);
    const all = await listTypeLocalUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeLocalController};
