import { injectable, inject } from "tsyringe";
import { TypeCalibrations } from "../../../entities/TypeCalibration";
import { ITypeCalibrationRepository } from "../../../repositories/TypeCalibration/ITypeCalibrationRepository";

@injectable()
class ListTypeCalibrationUseCase {
  constructor(
    @inject("TypeCalibrationRepository")
    private typeCalibrationRepository: ITypeCalibrationRepository){}

  async execute() : Promise<TypeCalibrations[]>{
    const typeCalibration = await this.typeCalibrationRepository.list();

    return typeCalibration;
  }
}
export {ListTypeCalibrationUseCase}
