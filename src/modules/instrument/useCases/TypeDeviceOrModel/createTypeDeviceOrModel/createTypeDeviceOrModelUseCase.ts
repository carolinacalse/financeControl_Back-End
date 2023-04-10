import { inject, injectable } from "tsyringe";
import { ITypeDeviceOrModelRepository } from "../../../repositories/TypeDeviceOrModel/ITypeDeviceOrModelRepository";

interface IRequest{
  typeDeviceOrModel_id?: number;
  item: string;
  device_id: number;
  model_id: number;
}


@injectable()
class CreateTypeDeviceOrModelUseCase {
  constructor(
    @inject("TypeDeviceOrModelRepository")
    private typeDeviceOrModelRepository: ITypeDeviceOrModelRepository) {}

  async execute({item, device_id, model_id}: IRequest) : Promise<void> {

    await this.typeDeviceOrModelRepository.create({
      item,
      device_id,
      model_id,
    });

  }
}

export {CreateTypeDeviceOrModelUseCase};
