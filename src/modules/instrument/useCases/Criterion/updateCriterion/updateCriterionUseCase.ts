import { injectable, inject } from "tsyringe";
import { Criterions } from "../../../entities/Criterions";
import { ICriterionRepository } from "../../../repositories/Criterion/ICriterionRepository";

interface IRequest {
  criterion_id?: number;
  typeCriterion?: string;
  acceptanceCriterion?: string;
  resolution?: string;
  rangeUse?: string;
  inactive?: string;
  instrument_id?: number;
}


@injectable()
class UpdateCriterionUseCase {
  constructor(
    @inject("CriterionRepository")
    private criterionRepository: ICriterionRepository){}


async execute({
      criterion_id,
      typeCriterion,
      acceptanceCriterion,
      resolution,
      rangeUse ,
      inactive,
      instrument_id,
  }:IRequest): Promise<Criterions>{
  const criterionData = await this.criterionRepository.findOne({where: {criterion_id: criterion_id}});
  const criterions = {
    ...criterionData,
      criterion_id,
      typeCriterion,
      acceptanceCriterion,
      resolution,
      rangeUse ,
      inactive,
      instrument_id,};
    await this.criterionRepository.save(criterions);
    return (criterions);
}
}

export {UpdateCriterionUseCase}
