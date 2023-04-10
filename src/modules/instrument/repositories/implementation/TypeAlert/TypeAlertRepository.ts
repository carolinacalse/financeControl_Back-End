
import { getRepository, Repository,  } from "typeorm";
import { TypeAlerts } from "../../../entities/TypeAlert";
import { ITypeAlertRepository, ICreateTypeAlertsDTO  } from "../../TypeAlert/ITypeAlertRepository";

class TypeAlertRepository implements ITypeAlertRepository {
  private repository : Repository<TypeAlerts>;
  constructor() {
  this.repository = getRepository(TypeAlerts);
  }

  async create({ typeAlert_id,docNum, partNumber, type, process, id_file, inactive}: ICreateTypeAlertsDTO): Promise<TypeAlerts> {
   const typeAlerts = this.repository.create({
    typeAlert_id,
    docNum,
    partNumber,
    type,
    process,
    id_file,
    inactive
   })
   const criado = await this.repository.save(typeAlerts);
   return criado
  }


  async findOne({ where: { typeAlert_id } }: { where: { typeAlert_id: any; }; }): Promise<TypeAlerts> {
    const typeAlerts = await this.repository.findOne({ where: { typeAlert_id } });
    return typeAlerts;
  }

  async save(typeAlert : ICreateTypeAlertsDTO) : Promise<TypeAlerts> {
    const typeAlerts = await this.repository.save(typeAlert);
    return typeAlerts;
  }

  async list(): Promise <TypeAlerts[]> {
    const typeAlert = await this.repository.find();
    return typeAlert;
   }

  async findByName(typeAlert_id: number) : Promise<TypeAlerts> {
  const typeAlerts = await this.repository.findOne({typeAlert_id});
  return typeAlerts;
  }
}
export {TypeAlertRepository};
