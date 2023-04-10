import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListTypeResolutionUseCase } from "./ListTypeResolutionUseCase";

class ListTypeResolutionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeResolutionUseCase = container.resolve(ListTypeResolutionUseCase);
    const all = await listTypeResolutionUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeResolutionController};
