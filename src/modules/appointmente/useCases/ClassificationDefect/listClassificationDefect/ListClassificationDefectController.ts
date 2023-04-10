import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListClassificationDefectUseCase } from "./ListClassificationDefectUseCase";

class ListClassificationDefectController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listClassificationDefectUseCase = container.resolve(ListClassificationDefectUseCase);
    const all = await listClassificationDefectUseCase.execute();

    return response.json(all);
  }
}
export {ListClassificationDefectController};
