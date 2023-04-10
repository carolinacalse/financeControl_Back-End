import { injectable, inject } from "tsyringe";
import { TypeDevices } from "../../../entities/TypeDevice";
import { ITypeDeviceRepository } from "../../../repositories/TypeDevice/ITypeDeviceRepository";

@injectable()
class ListTypeDeviceUseCase {
  constructor(
    @inject("TypeDeviceRepository")
    private typeDeviceRepository: ITypeDeviceRepository){}

  async execute() : Promise<TypeDevices[]>{
    const typeDevice = await this.typeDeviceRepository.list();

    return typeDevice;
  }
}
export {ListTypeDeviceUseCase}
