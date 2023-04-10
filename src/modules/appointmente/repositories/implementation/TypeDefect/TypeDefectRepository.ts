import { TypeDefects } from "../../../entities/TypeDefects";
import { getRepository, Repository,  } from "typeorm";
import { ITypeDefectRepository, ICreateTypeDefectsDTO  } from "../../TypeDefect/ITypeDefectRepository";

class TypeDefectRepository implements ITypeDefectRepository {
  private repository : Repository<TypeDefects>;
  constructor() {
  this.repository = getRepository(TypeDefects);
  }

  async create({ typeDefect_id,docNum, description}: ICreateTypeDefectsDTO): Promise<void> {
   const typeDefects = this.repository.create({
    typeDefect_id,
    docNum,
    description,
   })
   await this.repository.save(typeDefects);
  }


  async findOne({ where: { typeDefect_id } }: { where: { typeDefect_id: any; }; }): Promise<TypeDefects> {
    const typeDefects = await this.repository.findOne({ where: { typeDefect_id } });
    return typeDefects;
  }

  async save(typeDefect : ICreateTypeDefectsDTO) : Promise<TypeDefects> {
    const typeDefects = await this.repository.save(typeDefect);
    return typeDefects;
  }

  async list(): Promise <TypeDefects[]> {
    const typeDefect = await this.repository.find();
    return typeDefect;
   }

  async findByName(typeDefect_id: number) : Promise<TypeDefects> {
  const typeDefects = await this.repository.findOne({typeDefect_id});
  return typeDefects;
  }

 /*  async update(typeDefect_id: number) : Promise<TypeDefects> {
    const typeDefects = await this.repository.findOne({typeDefect_id});
    return typeDefects;
    }; */

}
export {TypeDefectRepository};
