import { TypeCalibrations } from "../../entities/TypeCalibration";


interface ICreateTypeCalibrationsDTO {
  typeCalibration_id?: number;
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

interface ITypeCalibrationRepository {
  findByName(typeCalibration_id: number): Promise<TypeCalibrations>;
  findOne({ where: { typeCalibration_id } }: { where: { typeCalibration_id: any } }): Promise<TypeCalibrations>;
  list(): Promise<TypeCalibrations[]>;
  save(typeInstrument : ICreateTypeCalibrationsDTO): Promise<TypeCalibrations>;
  create ({docNum,
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
    inactive,}: ICreateTypeCalibrationsDTO) : Promise<TypeCalibrations>;

  remove(typeCalibration: TypeCalibrations): Promise<void>;

}
export {ITypeCalibrationRepository, ICreateTypeCalibrationsDTO};
