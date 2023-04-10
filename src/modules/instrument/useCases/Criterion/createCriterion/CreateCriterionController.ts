import {Request, Response} from "express";
import {container} from "tsyringe"
import { CreateCriterionUseCase } from "./CreateCriterionUseCase";

class CreateCriterionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      criterions} = request.body;

    const createCriterionUseCase = container.resolve(CreateCriterionUseCase);

    await createCriterionUseCase.execute({
      criterions})
    return response.status(201).send();
  }
}
 export {CreateCriterionController}
