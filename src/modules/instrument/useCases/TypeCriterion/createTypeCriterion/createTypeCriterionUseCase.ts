import { inject, injectable } from "tsyringe";
import { ITypeCriterionRepository } from "../../../repositories/TypeCriterion/ITypeCriterionRepository";

interface IRequest{
  typeCriterion_id?: number;
  docNum: number;
  description: string;
  value: string;
}


@injectable()
class CreateTypeCriterionUseCase {
  constructor(
    @inject("TypeCriterionRepository")
    private typeCriterionRepository: ITypeCriterionRepository) {}

  async execute({docNum, description, value}: IRequest) : Promise<void> {
    await this.typeCriterionRepository.create({
      docNum,
      description,
      value,
    });

  }
}

export {CreateTypeCriterionUseCase};
