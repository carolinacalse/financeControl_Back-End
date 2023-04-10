import { TypeDeviceOrModels } from "../../entities/TypeDeviceOrModel";


interface ICreateTypeDeviceOrModelsDTO {
  typeDeviceOrModel_id?: number;
  item: string;
  device_id?: number;
  model_id?: number;
}

interface ITypeDeviceOrModelRepository {
  findByName(typeDeviceOrModel_id: number): Promise<TypeDeviceOrModels>;
  findOne({ where: { typeDeviceOrModel_id } }: { where: { typeDeviceOrModel_id: any } }): Promise<TypeDeviceOrModels>;
  list(): Promise<TypeDeviceOrModels[]>;
  save(typeDeviceOrModel : ICreateTypeDeviceOrModelsDTO[]): Promise<TypeDeviceOrModels>;
  create (typeDeviceOrModel: ICreateTypeDeviceOrModelsDTO) : Promise<TypeDeviceOrModels>;
  deleteDevice(device_id: number): Promise <void>
  deleteModel(model_id: number): Promise <void>
}
export {ITypeDeviceOrModelRepository, ICreateTypeDeviceOrModelsDTO};
