import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeDeviceOrModelUseCase } from "./createTypeDeviceOrModelUseCase";

class CreateTypeDeviceOrModelController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {item, device_id, model_id} = request.body;

    const createTypeDeviceOrModelUseCase = container.resolve(CreateTypeDeviceOrModelUseCase);

    await createTypeDeviceOrModelUseCase.execute({item, device_id, model_id});

    return response.status(200).send();
  }
}

export {CreateTypeDeviceOrModelController};
