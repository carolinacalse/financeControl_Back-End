import { injectable, inject } from "tsyringe";
import { Criterions } from "../../../entities/Criterions";
import { ICriterionRepository } from "../../../repositories/Criterion/ICriterionRepository";

@injectable()
class ListCriterionUseCase {
  constructor(
    @inject("CriterionRepository")
    private criterionRepository: ICriterionRepository){}

   async execute() : Promise<Criterions[]>{
    const criterion = await this.criterionRepository.list();

    return criterion;
  }
}
export {ListCriterionUseCase}
