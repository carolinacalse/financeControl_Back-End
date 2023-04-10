import { injectable, inject } from "tsyringe";
import { TypeCriterions } from "../../../entities/TypeCriterion";
import { ITypeCriterionRepository } from "../../../repositories/TypeCriterion/ITypeCriterionRepository";

@injectable()
class ListTypeCriterionUseCase {
  constructor(
    @inject("TypeCriterionRepository")
    private typeCriterionRepository: ITypeCriterionRepository){}

  async execute() : Promise<TypeCriterions[]>{
    const typeCriterion = await this.typeCriterionRepository.list();

    return typeCriterion;
  }
}
export {ListTypeCriterionUseCase}
