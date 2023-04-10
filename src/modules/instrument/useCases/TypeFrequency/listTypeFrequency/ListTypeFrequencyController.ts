import {Request, Response} from "express";
import {ListTypeFrequencyUseCase} from "./ListTypeFrequencyUseCase";
import {container} from "tsyringe";

class ListTypeFrequencyController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeFrequencyUseCase = container.resolve(ListTypeFrequencyUseCase);
    const all = await listTypeFrequencyUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeFrequencyController};
