import { injectable, inject } from "tsyringe";
import { TypeCriterions } from "../../../entities/TypeCriterion";
import { ITypeCriterionRepository } from "../../../repositories/TypeCriterion/ITypeCriterionRepository";

interface IRequest {
  typeCriterion_id:number;
  docNum: number;
  description: string;
  value: string;
  inactive: string;
}


@injectable()
class UpdateTypeCriterionUseCase {
  constructor(
    @inject("TypeCriterionRepository")
    private typeCriterionRepository: ITypeCriterionRepository){}


async execute({
  typeCriterion_id,
   docNum,
   description,
   value,
   inactive
  }:IRequest): Promise<TypeCriterions>{
  const typesCriterionData = await this.typeCriterionRepository.findOne({where: {typeCriterion_id: typeCriterion_id}});
  const typeCriterions = {
    ...typesCriterionData,
    docNum,
    description,
    value,
    inactive };
    await this.typeCriterionRepository.save(typeCriterions);
    return (typeCriterions);
}
}

export {UpdateTypeCriterionUseCase}
