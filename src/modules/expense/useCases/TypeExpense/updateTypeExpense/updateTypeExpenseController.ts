import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeExpenseUseCase } from "./updateTypeExpenseUseCase";

class UpdateTypeExpenseController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      typeExpense_id,
      docNum,
      description,
      inactive
    } = request.body;

    try {
    const updateTypeExpenseController= container.resolve(UpdateTypeExpenseUseCase);

    const types_response = await updateTypeExpenseController.execute({
      typeExpense_id,
      docNum,
      description,
      inactive
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeExpenseController};
