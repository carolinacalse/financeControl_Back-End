import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListTypeDeviceUseCase } from "./ListTypeDeviceUseCase";

class ListTypeDeviceController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeDeviceUseCase = container.resolve(ListTypeDeviceUseCase);
    const all = await listTypeDeviceUseCase.execute();

    return response.json(all);
  }
}
export {ListTypeDeviceController};
