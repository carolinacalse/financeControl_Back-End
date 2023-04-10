import { injectable, inject } from "tsyringe";
import { TypeCalibrations } from "../../../entities/TypeCalibration";
import { ITypeCalibrationRepository } from "../../../repositories/TypeCalibration/ITypeCalibrationRepository";

interface IRequest {
  typeCalibration_id: number;
  docNum: number;
  dateCalibration: string;
  nextCalibration: string;
  finalReport: string;
  type: string;
  item: string;
  provider : string;
  note: string;
  status: string;
  id_model: number;
  id_instrument: number;
  id_device: number;
  inactive:string;
}


@injectable()
class UpdateTypeCalibrationUseCase {
  constructor(
    @inject("TypeCalibrationRepository")
    private typeCalibrationRepository: ITypeCalibrationRepository){}


async execute({
  typeCalibration_id,
  docNum,
  dateCalibration,
  nextCalibration,
  finalReport,
  type,
  item,
  provider,
  note,
  status,
  id_model,
  id_instrument,
  id_device,
  inactive,
  }:IRequest): Promise<TypeCalibrations>{
  const typesCalibrationData = await this.typeCalibrationRepository.findOne({where: {typeCalibration_id: typeCalibration_id}});
  const typeCalibrations = {
    ...typesCalibrationData,
      typeCalibration_id,
      docNum,
      dateCalibration,
      nextCalibration,
      finalReport,
      type,
      item,
      provider,
      note,
      status,
      id_model,
      id_instrument,
      id_device,
      inactive,};
    await this.typeCalibrationRepository.save(typeCalibrations);
    return (typeCalibrations);
}
}

export {UpdateTypeCalibrationUseCase}
