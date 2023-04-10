import { TypeCalibrationCriterions } from "../../entities/TypeCalibrationCriterion";


interface ICreateTypeCalibrationCriterionsDTO {
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

interface ITypeCalibrationCriterionRepository {
  findByName(typeCalibrationCriterion_id: number): Promise<TypeCalibrationCriterions>;
  findOne({ where: { typeCalibrationCriterion_id } }: { where: { typeCalibrationCriterion_id: any } }): Promise<TypeCalibrationCriterions>;
  list(): Promise<TypeCalibrationCriterions[]>;
  save(typeInstrument : ICreateTypeCalibrationCriterionsDTO): Promise<TypeCalibrationCriterions>;
  create ({
    criterion_id,
    typeCalibration_id,
    description,
    value,
    statusLine,
    uncertainty,
    error,
    amount,}: ICreateTypeCalibrationCriterionsDTO) : Promise<void>;
  createMultiple(criterions: ICreateTypeCalibrationCriterionsDTO[]): Promise<void>;

}
export {ITypeCalibrationCriterionRepository, ICreateTypeCalibrationCriterionsDTO};
