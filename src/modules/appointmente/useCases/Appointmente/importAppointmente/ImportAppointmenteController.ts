import { ImportAppointmenteUseCase } from "./ImportAppointmenteUseCase";
import {Request, Response} from 'express';
import {container} from "tsyringe";

class ImportAppointmenteController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {file} = request;

    const importAppointmenteUseCase = container.resolve(ImportAppointmenteUseCase);

    await importAppointmenteUseCase.execute(file);

    return response.send();
  }
}
export {ImportAppointmenteController};
