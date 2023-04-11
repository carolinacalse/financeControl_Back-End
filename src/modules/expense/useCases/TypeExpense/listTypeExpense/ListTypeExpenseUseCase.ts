import { injectable, inject } from "tsyringe";
import { ITypeExpenseRepository } from "../../../repositories/TypeExpense/ITypeExpenseRepository";
import { TypeExpenses } from "../../../entities/TypeExpense";

@injectable()
class ListTypeExpenseUseCase {
  constructor(
    @inject("TypeExpenseRepository")
    private typeExpenseRepository: ITypeExpenseRepository){}

  async execute() : Promise<TypeExpenses[]>{
    const typeExpense = await this.typeExpenseRepository.list();

    return typeExpense;
  }
}
export {ListTypeExpenseUseCase}
