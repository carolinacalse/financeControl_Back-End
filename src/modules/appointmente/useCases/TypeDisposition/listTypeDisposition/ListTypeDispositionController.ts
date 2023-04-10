import {Request, Response} from "express";
import {ListTypeDispositionUseCase} from "./ListTypeDispositionUseCase";
import {container} from "tsyringe";

class ListTypeDispositionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeDispositionUseCase = container.resolve(ListTypeDispositionUseCase);
    const all = await listTypeDispositionUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeDispositionController};
