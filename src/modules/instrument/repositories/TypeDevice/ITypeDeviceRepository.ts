import { TypeDevices } from "../../entities/TypeDevice";


interface ICreateTypeDevicesDTO {
  typeDevice_id?: number;
  docNum: number;
  developed: string;
  frequency:string;
  location: string;
  responsible: string;
  customer: string;
  status: string;
  criterion: string;
  note: string;
  inactive?: string;
  positionID?: number;
  positionDescription?: string;
}

interface ITypeDeviceRepository {
  findByName(typeDevice_id: number): Promise<TypeDevices>;
  findOne({ where: { typeDevice_id } }: { where: { typeDevice_id: any } }): Promise<TypeDevices>;
  list(): Promise<TypeDevices[]>;
  save(typeInstrument : ICreateTypeDevicesDTO): Promise<TypeDevices>;
  create ({docNum, developed, location, responsible, customer, status, criterion, note, positionID, positionDescription }: ICreateTypeDevicesDTO) : Promise<TypeDevices>;

}
export {ITypeDeviceRepository, ICreateTypeDevicesDTO};
