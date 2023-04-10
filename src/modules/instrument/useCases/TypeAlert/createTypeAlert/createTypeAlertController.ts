import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeAlertUseCase } from "./createTypeAlertUseCase";

class CreateTypeAlertController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum, partNumber, type, process, id_file, inactive, process_alert} = request.body;

    const createTypeAlertUseCase = container.resolve(CreateTypeAlertUseCase);

    const send = await createTypeAlertUseCase.execute({docNum, partNumber, type, process, id_file, inactive, process_alert});

    return response.status(200).json(send);
  }
}

export {CreateTypeAlertController};
