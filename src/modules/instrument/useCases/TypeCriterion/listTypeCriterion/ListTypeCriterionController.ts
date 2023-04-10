import {Request, Response} from "express";
import {ListTypeCriterionUseCase} from "./ListTypeCriterionUseCase";
import {container} from "tsyringe";

class ListTypeCriterionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeCriterionUseCase = container.resolve(ListTypeCriterionUseCase);
    const all = await listTypeCriterionUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeCriterionController};
