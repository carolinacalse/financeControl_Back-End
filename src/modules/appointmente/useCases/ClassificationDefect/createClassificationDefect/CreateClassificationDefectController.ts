import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateClassificationDefectUseCase } from "./CreateClassificationDefectUseCase";

class CreateClassificationDefectController {
  async handle(request: Request, response: Response) : Promise<Response> {
    /* const {docNum, description, inactive} = request.body; */
    const {docNum, description, level} = request.body;

    const createClassificationDefectUseCase = container.resolve(CreateClassificationDefectUseCase);

    await createClassificationDefectUseCase.execute({docNum, description, level});

    return response.status(200).send();
  }
}

export {CreateClassificationDefectController};
