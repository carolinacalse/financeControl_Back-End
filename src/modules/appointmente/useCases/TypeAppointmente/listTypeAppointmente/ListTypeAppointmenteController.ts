import {Request, Response} from "express";
import {ListTypeAppointmenteUseCase} from "./ListTypeAppointmenteUseCase";
import {container} from "tsyringe";

class ListTypeAppointmenteController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeAppointmenteUseCase = container.resolve(ListTypeAppointmenteUseCase);
    const all = await listTypeAppointmenteUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeAppointmenteController};
