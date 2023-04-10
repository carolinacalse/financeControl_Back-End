import {Request, Response} from "express";
import {ListAppointmenteUseCase} from "./ListAppointmenteUseCase";
import {container} from "tsyringe";


class ListAppointmenteController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listAppointmenteUseCase = container.resolve(ListAppointmenteUseCase);
    const all = await listAppointmenteUseCase.execute();

    return response.json(all);
  }
}
export {ListAppointmenteController};
