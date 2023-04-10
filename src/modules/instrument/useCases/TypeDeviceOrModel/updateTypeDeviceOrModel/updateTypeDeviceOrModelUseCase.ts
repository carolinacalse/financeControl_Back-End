import { injectable, inject } from "tsyringe";
import { TypeDeviceOrModels } from "../../../entities/TypeDeviceOrModel";
import { ITypeDeviceOrModelRepository } from "../../../repositories/TypeDeviceOrModel/ITypeDeviceOrModelRepository";

interface IRequest {
  typeDeviceOrModel_id?:number;
  item: string;
  device_id: number;
  model_id: number;
}


@injectable()
class UpdateTypeDeviceOrModelUseCase {
  constructor(
    @inject("TypeDeviceOrModelRepository")
    private typeDeviceOrModelRepository: ITypeDeviceOrModelRepository){}


async execute({
  typeDeviceOrModel_id,
  item,
  device_id,
  model_id
  }:IRequest): Promise<TypeDeviceOrModels>{
  const typesDeviceOrModelData = await this.typeDeviceOrModelRepository.findOne({where: {typeDeviceOrModel_id: typeDeviceOrModel_id}});
  const typeDeviceOrModels = {
    ...typesDeviceOrModelData,
    item,
    device_id,
    model_id };
    await this.typeDeviceOrModelRepository.save(typeDeviceOrModels);
    return (typeDeviceOrModels);
}
}

export {UpdateTypeDeviceOrModelUseCase}
