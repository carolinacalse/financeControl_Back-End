import {Request, Response} from "express";
import {ListTypeDefectUseCase} from "./ListTypeDefectUseCase";
import {container} from "tsyringe";

class ListTypeDefectController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeDefectUseCase = container.resolve(ListTypeDefectUseCase);
    const all = await listTypeDefectUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeDefectController};
