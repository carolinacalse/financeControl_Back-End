import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeDeviceUseCase } from "./createTypeDeviceUseCase";

class CreateTypeDeviceController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {docNum, developed, frequency, location, responsible, customer, status, partNumber, criterion, note, positionID, positionDescription} = request.body;

    const createTypeDeviceUseCase = container.resolve(CreateTypeDeviceUseCase);

    await createTypeDeviceUseCase.execute({docNum, developed, frequency, location, responsible, customer, status, partNumber, criterion, note, positionID, positionDescription});

    return response.status(200).send();
  }
}

export {CreateTypeDeviceController};
