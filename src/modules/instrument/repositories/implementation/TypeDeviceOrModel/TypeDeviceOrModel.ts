
import { getRepository, Repository,  } from "typeorm";
import { TypeDeviceOrModels } from "../../../entities/TypeDeviceOrModel";
import { ITypeDeviceOrModelRepository, ICreateTypeDeviceOrModelsDTO  } from "../../TypeDeviceOrModel/ITypeDeviceOrModelRepository";

class TypeDeviceOrModelRepository implements ITypeDeviceOrModelRepository {
  private repository : Repository<TypeDeviceOrModels>;
  constructor() {
  this.repository = getRepository(TypeDeviceOrModels);
  }

  async create(typeDeviceOrModel: ICreateTypeDeviceOrModelsDTO): Promise<TypeDeviceOrModels> {
    const typeDeviceOrModels = this.repository.create(typeDeviceOrModel)
    const responseTypeDeviceOrModels = await this.repository.save(typeDeviceOrModels);
    return responseTypeDeviceOrModels;
  }

  async findOne({ where: { typeDeviceOrModel_id } }: { where: { typeDeviceOrModel_id: any; }; }): Promise<TypeDeviceOrModels> {
    const typeDeviceOrModels = await this.repository.findOne({ where: { typeDeviceOrModel_id } });
    return typeDeviceOrModels;
  }

  async save(typeDeviceOrModel : ICreateTypeDeviceOrModelsDTO) : Promise<TypeDeviceOrModels> {
    const typeDeviceOrModels = await this.repository.save(typeDeviceOrModel);
    return typeDeviceOrModels;
  }

  async list(): Promise <TypeDeviceOrModels[]> {
    const typeDeviceOrModel = await this.repository.find();
    return typeDeviceOrModel;
   }

  async findByName(typeDeviceOrModel_id: number) : Promise<TypeDeviceOrModels> {
  const typeDeviceOrModels = await this.repository.findOne({typeDeviceOrModel_id});
  return typeDeviceOrModels;
  }

  async deleteDevice(device_id: number): Promise<void> {
    await this.repository.delete({device_id})
  }
  async deleteModel(model_id: number): Promise<void> {
    await this.repository.delete({model_id})
  }

}
export {TypeDeviceOrModelRepository};
