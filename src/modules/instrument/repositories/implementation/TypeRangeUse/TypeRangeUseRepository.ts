import { TypeRangeUses } from "../../../entities/TypeRangeUses";
import { getRepository, Repository,  } from "typeorm";
import { ITypeRangeUseRepository, ICreateTypeRangeUsesDTO  } from "../../TypeRangeUse/ITypeRangeUseRepository";

class TypeRangeUseRepository implements ITypeRangeUseRepository {
  private repository : Repository<TypeRangeUses>;
  constructor() {
  this.repository = getRepository(TypeRangeUses);
  }

  async create({ typeRangeUse_id,docNum, minimum, maximum,}: ICreateTypeRangeUsesDTO): Promise<void> {
   const typeRangeUses = this.repository.create({
    typeRangeUse_id,
    docNum,
    minimum,
    maximum,
   })
   await this.repository.save(typeRangeUses);
  }


  async findOne({ where: { typeRangeUse_id } }: { where: { typeRangeUse_id: any; }; }): Promise<TypeRangeUses> {
    const typeRangeUses = await this.repository.findOne({ where: { typeRangeUse_id } });
    return typeRangeUses;
  }

  async save(typeRangeUse : ICreateTypeRangeUsesDTO) : Promise<TypeRangeUses> {
    const typeRangeUses = await this.repository.save(typeRangeUse);
    return typeRangeUses;
  }

  async list(): Promise <TypeRangeUses[]> {
    const typeRangeUse = await this.repository.find();
    return typeRangeUse;
   }

  async findByName(typeRangeUse_id: number) : Promise<TypeRangeUses> {
  const typeRangeUses = await this.repository.findOne({typeRangeUse_id});
  return typeRangeUses;
  }


}
export {TypeRangeUseRepository};
