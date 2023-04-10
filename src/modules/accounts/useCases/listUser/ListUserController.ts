import {Request, Response} from "express";
import {ListUserUseCase} from "./ListUserUseCase";
import {container} from "tsyringe";

class ListUserController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listUserUseCase = container.resolve(ListUserUseCase);
    const all = await listUserUseCase.execute();

    return response.json(all);
  }
}
export {ListUserController};
