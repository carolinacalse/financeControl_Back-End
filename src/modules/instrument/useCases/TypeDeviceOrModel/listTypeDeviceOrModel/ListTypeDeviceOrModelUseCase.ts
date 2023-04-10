import { injectable, inject } from "tsyringe";
import { TypeDeviceOrModels } from "../../../entities/TypeDeviceOrModel";
import { ITypeDeviceOrModelRepository } from "../../../repositories/TypeDeviceOrModel/ITypeDeviceOrModelRepository";

@injectable()
class ListTypeDeviceOrModelUseCase {
  constructor(
    @inject("TypeDeviceOrModelRepository")
    private typeDeviceOrModelRepository: ITypeDeviceOrModelRepository){}

  async execute() : Promise<TypeDeviceOrModels[]>{
    const typeDeviceOrModel = await this.typeDeviceOrModelRepository.list();

    return typeDeviceOrModel;
  }
}
export {ListTypeDeviceOrModelUseCase}
