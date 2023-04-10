import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListCriterionUseCase } from "./ListCriterionUseCase";


class ListCriterionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listCriterionUseCase = container.resolve(ListCriterionUseCase);
    const all = await listCriterionUseCase.execute();

    return response.json(all);
  }
}
export {ListCriterionController};
