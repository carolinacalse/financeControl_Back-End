import { inject, injectable } from "tsyringe";
import { TypeCalibrationCriterions } from '../../../entities/TypeCalibrationCriterion';
import { ITypeCalibrationRepository } from "../../../repositories/TypeCalibration/ITypeCalibrationRepository";
import { ITypeCalibrationCriterionRepository } from "../../../repositories/TypeCalibrationCriterion/ITypeCalibrationCriterionRepository";
interface ITypeCalibrationCriterions extends TypeCalibrationCriterions{
  criterionDescription: string;
  criterionValue: string;
  total: number;
  lineReport: string;
}
interface IRequest{
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
  criterions: ITypeCalibrationCriterions[];
}

@injectable()
class CreateTypeCalibrationUseCase {
  constructor(
    @inject("TypeCalibrationCriterionRepository")
    private typeCalibrationRCriterionRepository: ITypeCalibrationCriterionRepository,
    @inject("TypeCalibrationRepository")
    private typeCalibrationRepository: ITypeCalibrationRepository) {}

  async execute({
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
    criterions}: IRequest) : Promise<void> {

    const response_create = await this.typeCalibrationRepository.create({
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
    });

    if(criterions && criterions.length > 0 ){
      let arrayCriterions = [];
      criterions.map( eachCriterion => {
        arrayCriterions.push({
          criterion_id: eachCriterion.criterion_id,
          typeCalibration_id: response_create.typeCalibration_id,
          description: eachCriterion.criterionDescription,
          value: eachCriterion.criterionValue,
          uncertainty: Number(eachCriterion.uncertainty),
          error: Number(eachCriterion.error),
          amount: Number(eachCriterion.total),
          statusLine: eachCriterion.lineReport,
        });
      });

      if(arrayCriterions.length > 0){
        try{
          await this.typeCalibrationRCriterionRepository.createMultiple(arrayCriterions);
        } catch (error) {
          await this.typeCalibrationRepository.remove(response_create);
          throw new Error(error);
        }
      }
    }
  }
}

export {CreateTypeCalibrationUseCase};
