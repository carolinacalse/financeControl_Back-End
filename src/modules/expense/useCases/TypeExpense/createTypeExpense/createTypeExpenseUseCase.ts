import { inject, injectable } from "tsyringe";
import { ITypeExpenseRepository } from "../../../repositories/TypeExpense/ITypeExpenseRepository";

interface IRequest{
  typeExpense_id?: number;
  docNum: number;
  description: string;
}


@injectable()
class CreateTypeExpenseUseCase {
  constructor(
    @inject("TypeExpenseRepository")
    private typeExpenseRepository: ITypeExpenseRepository) {}

  async execute({docNum, description}: IRequest) : Promise<void> {

    await this.typeExpenseRepository.create({
      docNum,
      description,
    });

  }
}

export {CreateTypeExpenseUseCase};
