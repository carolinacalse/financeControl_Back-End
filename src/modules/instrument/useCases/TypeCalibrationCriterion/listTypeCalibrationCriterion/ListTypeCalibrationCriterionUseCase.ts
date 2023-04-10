import { injectable, inject } from "tsyringe";
import { TypeCalibrationCriterions } from "../../../entities/TypeCalibrationCriterion";
import { ITypeCalibrationCriterionRepository } from "../../../repositories/TypeCalibrationCriterion/ITypeCalibrationCriterionRepository";

@injectable()
class ListTypeCalibrationCriterionUseCase {
  constructor(
    @inject("TypeCalibrationCriterionRepository")
    private typeCalibrationCriterionRepository: ITypeCalibrationCriterionRepository){}

  async execute() : Promise<TypeCalibrationCriterions[]>{
    const typeCalibrationCriterion = await this.typeCalibrationCriterionRepository.list();

    return typeCalibrationCriterion;
  }
}
export {ListTypeCalibrationCriterionUseCase}
