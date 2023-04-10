import { inject, injectable } from "tsyringe";
import { ITypeCalibrationCriterionRepository } from "../../../repositories/TypeCalibrationCriterion/ITypeCalibrationCriterionRepository";

interface IRequest{
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
class CreateTypeCalibrationCriterionUseCase {
  constructor(
    @inject("TypeCalibrationCriterionRepository")
    private typeCalibrationCriterionRepository: ITypeCalibrationCriterionRepository) {}

  async execute({
    criterion_id,
      typeCalibration_id,
      description,
      value,
      statusLine,
      uncertainty,
      error,
      amount,}: IRequest) : Promise<void> {

    const response_create = await this.typeCalibrationCriterionRepository.create({
      criterion_id,
      typeCalibration_id,
      description,
      value,
      statusLine,
      uncertainty,
      error,
      amount
    });
  }
}

export {CreateTypeCalibrationCriterionUseCase};
