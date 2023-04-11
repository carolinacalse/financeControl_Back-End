
import { getRepository, Repository,  } from "typeorm";
import { ITypeExpenseRepository, ICreateTypeExpensesDTO  } from "../../TypeExpense/ITypeExpenseRepository";
import { TypeExpenses } from "../../../entities/TypeExpense";

class TypeExpenseRepository implements ITypeExpenseRepository {
  private repository : Repository<TypeExpenses>;
  constructor() {
  this.repository = getRepository(TypeExpenses);
  }

  async create({ typeExpense_id,docNum, description}: ICreateTypeExpensesDTO): Promise<void> {
   const typeExpenses = this.repository.create({
    typeExpense_id,
    docNum,
    description,
   })
   await this.repository.save(typeExpenses);
  }


  async findOne({ where: { typeExpense_id } }: { where: { typeExpense_id: any; }; }): Promise<TypeExpenses> {
    const typeExpenses = await this.repository.findOne({ where: { typeExpense_id } });
    return typeExpenses;
  }

  async save(typeExpense : ICreateTypeExpensesDTO) : Promise<TypeExpenses> {
    const typeExpenses = await this.repository.save(typeExpense);
    return typeExpenses;
  }

  async list(): Promise <TypeExpenses[]> {
    const typeExpense = await this.repository.find();
    return typeExpense;
   }

  async findByName(typeExpense_id: number) : Promise<TypeExpenses> {
  const typeExpenses = await this.repository.findOne({typeExpense_id});
  return typeExpenses;
  }


}
export {TypeExpenseRepository};
