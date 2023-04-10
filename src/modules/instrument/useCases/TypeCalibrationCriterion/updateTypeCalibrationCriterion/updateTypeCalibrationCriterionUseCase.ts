import { injectable, inject } from "tsyringe";
import { TypeCalibrationCriterions } from "../../../entities/TypeCalibrationCriterion";
import { ITypeCalibrationCriterionRepository } from "../../../repositories/TypeCalibrationCriterion/ITypeCalibrationCriterionRepository";

interface IRequest {
  typeCalibrationCriterion_id?: number;
  criterion_id: number;
  typeCalibration_id: number;
  description: string;
  value: string;
  statusLine: string;
  uncertainty: number;
  error : number;
  amount: number;
}


@injectable()
class UpdateTypeCalibrationCriterionUseCase {
  constructor(
    @inject("TypeCalibrationCriterionRepository")
    private typeCalibrationCriterionRepository: ITypeCalibrationCriterionRepository){}


async execute({
  typeCalibrationCriterion_id,
  criterion_id,
  typeCalibration_id,
  description,
  value,
  statusLine,
  uncertainty,
  error,
  amount
  }:IRequest): Promise<TypeCalibrationCriterions>{
  const typesCalibrationCriterionData = await this.typeCalibrationCriterionRepository.findOne({where: {typeCalibrationCriterion_id: typeCalibrationCriterion_id}});
  const typeCalibrationCriterions = {
    ...typesCalibrationCriterionData,
      typeCalibrationCriterion_id,
      criterion_id,
      typeCalibration_id,
      description,
      value,
      statusLine,
      uncertainty,
      error,
      amount};
    await this.typeCalibrationCriterionRepository.save(typeCalibrationCriterions);
    return (typeCalibrationCriterions);
}
}

export {UpdateTypeCalibrationCriterionUseCase}
