import {Request, Response} from "express";
import {ListTypeImagesUseCase} from "./ListTypeImagesUseCase";
import {container} from "tsyringe";

class ListTypeImagesController {

  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeImagesUseCase = container.resolve(ListTypeImagesUseCase);
    const image = await listTypeImagesUseCase.execute();

    return response.json(image);
  }
}
export {ListTypeImagesController};
