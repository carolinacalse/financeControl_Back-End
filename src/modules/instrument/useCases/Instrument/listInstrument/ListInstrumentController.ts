import {Request, Response} from "express";
import {ListInstrumentUseCase} from "./ListInstrumentUseCase";
import {container} from "tsyringe";


class ListInstrumentController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listInstrumentUseCase = container.resolve(ListInstrumentUseCase);
    const all = await listInstrumentUseCase.execute();

    return response.json(all);
  }
}
export {ListInstrumentController};
