
import { getRepository, Repository,  } from "typeorm";
import { TypeDevices } from "../../../entities/TypeDevice";
import { ITypeDeviceRepository, ICreateTypeDevicesDTO  } from "../../TypeDevice/ITypeDeviceRepository";

class TypeDeviceRepository implements ITypeDeviceRepository {
  private repository : Repository<TypeDevices>;
  constructor() {
  this.repository = getRepository(TypeDevices);
  }

  async create({ docNum, developed, frequency, location, responsible, customer, status, criterion, note, positionID, positionDescription}: ICreateTypeDevicesDTO): Promise<TypeDevices> {
   const typeDevices = this.repository.create({
    docNum,
    developed,
    location,
    frequency,
    responsible,
    customer,
    status,
    criterion,
    note,
    positionID,
    positionDescription,
   })
   const typeDevicesResponse = await this.repository.save(typeDevices);

   return typeDevicesResponse;
  }


  async findOne({ where: { typeDevice_id } }: { where: { typeDevice_id: any; }; }): Promise<TypeDevices> {
    const typeDevices = await this.repository.findOne({ where: { typeDevice_id } });
    return typeDevices;
  }

  async save(typeDevice : ICreateTypeDevicesDTO) : Promise<TypeDevices> {
    const typeDevices = await this.repository.save(typeDevice);
    return typeDevices;
  }

  async list(): Promise <TypeDevices[]> {
    const typeDevice = await this.repository.find();
    return typeDevice;
   }

  async findByName(typeDevice_id: number) : Promise<TypeDevices> {
  const typeDevices = await this.repository.findOne({typeDevice_id});
  return typeDevices;
  }

}
export {TypeDeviceRepository};
