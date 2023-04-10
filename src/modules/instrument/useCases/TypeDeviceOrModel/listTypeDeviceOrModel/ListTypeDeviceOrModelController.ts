import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListTypeDeviceOrModelUseCase } from "./ListTypeDeviceOrModelUseCase";

class ListTypeDeviceOrModelController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeDeviceOrModelUseCase = container.resolve(ListTypeDeviceOrModelUseCase);
    const all = await listTypeDeviceOrModelUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeDeviceOrModelController};
