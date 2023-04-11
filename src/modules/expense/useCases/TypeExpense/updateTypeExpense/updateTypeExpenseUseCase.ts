import { injectable, inject } from "tsyringe";
import { ITypeExpenseRepository } from "../../../repositories/TypeExpense/ITypeExpenseRepository";
import { TypeExpenses } from "../../../entities/TypeExpense";

interface IRequest {
  typeExpense_id:number;
  docNum: number;
  description: string;
  inactive: string;
}


@injectable()
class UpdateTypeExpenseUseCase {
  constructor(
    @inject("TypeExpenseRepository")
    private typeExpenseRepository: ITypeExpenseRepository){}


async execute({
  typeExpense_id,
   docNum,
   description,
   inactive
  }:IRequest): Promise<TypeExpenses>{
  const typesExpenseData = await this.typeExpenseRepository.findOne({where: {typeExpense_id: typeExpense_id}});
  const typeExpenses = {
    ...typesExpenseData,
    docNum,
    description,
    inactive };
    await this.typeExpenseRepository.save(typeExpenses);
    return (typeExpenses);
}
}

export {UpdateTypeExpenseUseCase}
