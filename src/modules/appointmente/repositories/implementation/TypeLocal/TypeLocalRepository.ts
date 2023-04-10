
import { getRepository, Repository,  } from "typeorm";
import { TypeLocals } from "../../../entities/TypeLocal";
import { ITypeLocalRepository, ICreateTypeLocalsDTO  } from "../../TypeLocal/ITypeLocalRepository";

class TypeLocalRepository implements ITypeLocalRepository {
  private repository : Repository<TypeLocals>;
  constructor() {
  this.repository = getRepository(TypeLocals);
  }

  async create({ typeLocal_id,docNum, group, subgroup, type}: ICreateTypeLocalsDTO): Promise<void> {
   const typeLocals = this.repository.create({
    typeLocal_id,
    docNum,
    group,
    subgroup,
    type,
   })
   await this.repository.save(typeLocals);
  };


  async findOne({ where: { typeLocal_id } }: { where: { typeLocal_id: any; }; }): Promise<TypeLocals> {
    const typeLocals = await this.repository.findOne({ where: { typeLocal_id } });
    return typeLocals;
  }

  async save(typeLocal : ICreateTypeLocalsDTO) : Promise<TypeLocals> {
    const typeLocals = await this.repository.save(typeLocal);
    return typeLocals;
  }

  async list(): Promise <TypeLocals[]> {
    const typeLocal = await this.repository.find();
    return typeLocal;
   }

  async findByName(typeLocal_id: number) : Promise<TypeLocals> {
  const typeLocals = await this.repository.findOne({typeLocal_id});
  return typeLocals;
  };

}
export {TypeLocalRepository};
