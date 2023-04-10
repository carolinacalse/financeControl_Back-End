import { TypeFrequencys } from "../../../entities/TypeFrequencys";
import { getRepository, Repository,  } from "typeorm";
import { ITypeFrequencyRepository, ICreateTypeFrequencysDTO  } from "../../TypeFrequency/ITypeFrequencyRepository";

class TypeFrequencyRepository implements ITypeFrequencyRepository {
  private repository : Repository<TypeFrequencys>;
  constructor() {
  this.repository = getRepository(TypeFrequencys);
  }

  async create({ typeFrequency_id,docNum, description}: ICreateTypeFrequencysDTO): Promise<void> {
   const typeFrequencys = this.repository.create({
    typeFrequency_id,
    docNum,
    description,
   })
   await this.repository.save(typeFrequencys);
  }


  async findOne({ where: { typeFrequency_id } }: { where: { typeFrequency_id: any; }; }): Promise<TypeFrequencys> {
    const typeFrequencys = await this.repository.findOne({ where: { typeFrequency_id } });
    return typeFrequencys;
  }

  async save(typeFrequency : ICreateTypeFrequencysDTO) : Promise<TypeFrequencys> {
    const typeFrequencys = await this.repository.save(typeFrequency);
    return typeFrequencys;
  }

  async list(): Promise <TypeFrequencys[]> {
    const typeFrequency = await this.repository.find();
    return typeFrequency;
   }

  async findByName(typeFrequency_id: number) : Promise<TypeFrequencys> {
  const typeFrequencys = await this.repository.findOne({typeFrequency_id});
  return typeFrequencys;
  }


}
export {TypeFrequencyRepository};
