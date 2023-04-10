import {Request, Response} from "express";
import {ListTypeRangeUseUseCase} from "./ListTypeRangeUseUseCase";
import {container} from "tsyringe";

class ListTypeRangeUseController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeRangeUseUseCase = container.resolve(ListTypeRangeUseUseCase);
    const all = await listTypeRangeUseUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeRangeUseController};
