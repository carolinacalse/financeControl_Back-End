import { TypeExpenses } from "../../entities/TypeExpense";


interface ICreateTypeExpensesDTO {
  typeExpense_id?: number;
  docNum: number;
  description: string;
  inactive?: string;
}

interface ITypeExpenseRepository {
  findByName(typeExpense_id: number): Promise<TypeExpenses>;
  findOne({ where: { typeExpense_id } }: { where: { typeExpense_id: any } }): Promise<TypeExpenses>;
  list(): Promise<TypeExpenses[]>;
  save(typeExpense : ICreateTypeExpensesDTO): Promise<TypeExpenses>;
  /* update (typeExpense_id,description, inactive): Promise<TypeExpenses>; */
  create ({docNum, description, }: ICreateTypeExpensesDTO) : Promise<void>;

}
export {ITypeExpenseRepository, ICreateTypeExpensesDTO};
