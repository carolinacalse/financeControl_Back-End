import {Request, Response} from "express";
import {ListNotConformUseCase} from "./ListNotConformUseCase";
import {container} from "tsyringe";


class ListNotConformController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listNotConformUseCase = container.resolve(ListNotConformUseCase);
    const all = await listNotConformUseCase.execute();

    return response.json(all);
  }
}
export {ListNotConformController};
