import { TypeAlerts } from "../../entities/TypeAlert";


interface ICreateTypeAlertsDTO {
  typeAlert_id?: number;
  docNum: number;
  partNumber: string;
  type: string;
  process?: string;
  id_file: string;
  inactive: string;
}

interface ITypeAlertRepository {
  findByName(typeAlert_id: number): Promise<TypeAlerts>;
  findOne({ where: { typeAlert_id } }: { where: { typeAlert_id: any } }): Promise<TypeAlerts>;
  list(): Promise<TypeAlerts[]>;
  save(typeInstrument : ICreateTypeAlertsDTO): Promise<TypeAlerts>;
  create ({docNum, partNumber, type, process, id_file, inactive }: ICreateTypeAlertsDTO) : Promise<TypeAlerts>;

}
export {ITypeAlertRepository, ICreateTypeAlertsDTO};
