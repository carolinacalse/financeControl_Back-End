
import { getRepository, Repository,  } from "typeorm";
import { TypeResolutions } from "../../../entities/TypeResolution";
import { ITypeResolutionRepository, ICreateTypeResolutionsDTO  } from "../../TypeResolution/ITypeResolutionRepository";

class TypeResolutionRepository implements ITypeResolutionRepository {
  private repository : Repository<TypeResolutions>;
  constructor() {
  this.repository = getRepository(TypeResolutions);
  }

  async create({ typeResolution_id,docNum, description}: ICreateTypeResolutionsDTO): Promise<void> {
   const typeResolutions = this.repository.create({
    typeResolution_id,
    docNum,
    description,
   })
   await this.repository.save(typeResolutions);
  }


  async findOne({ where: { typeResolution_id } }: { where: { typeResolution_id: any; }; }): Promise<TypeResolutions> {
    const typeResolutions = await this.repository.findOne({ where: { typeResolution_id } });
    return typeResolutions;
  }

  async save(typeResolution : ICreateTypeResolutionsDTO) : Promise<TypeResolutions> {
    const typeResolutions = await this.repository.save(typeResolution);
    return typeResolutions;
  }

  async list(): Promise <TypeResolutions[]> {
    const typeResolution = await this.repository.find();
    return typeResolution;
   }

  async findByName(typeResolution_id: number) : Promise<TypeResolutions> {
  const typeResolutions = await this.repository.findOne({typeResolution_id});
  return typeResolutions;
  }

}
export {TypeResolutionRepository};
