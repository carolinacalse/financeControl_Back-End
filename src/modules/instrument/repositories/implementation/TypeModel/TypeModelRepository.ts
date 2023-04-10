
import { getRepository, Repository,  } from "typeorm";
import { TypeModels } from "../../../entities/TypeModel";

import { ITypeModelRepository, ICreateTypeModelsDTO  } from "../../TypeModel/ITypeModelRepository";

class TypeModelRepository implements ITypeModelRepository {
  private repository : Repository<TypeModels>;
  constructor() {
  this.repository = getRepository(TypeModels);
  }

  async create({ docNum, developed, frequency, location, responsible, customer, status, positionID, positionDescription }: ICreateTypeModelsDTO): Promise<TypeModels> {
   const typeModels = this.repository.create({
    docNum,
    developed,
    frequency,
    location,
    responsible,
    customer,
    status,
    positionID,
    positionDescription,
   })
   const typeModelsResponse = await this.repository.save(typeModels);

   return typeModelsResponse;
  }


  async findOne({ where: { typeModel_id } }: { where: { typeModel_id: any; }; }): Promise<TypeModels> {
    const typeModels = await this.repository.findOne({ where: { typeModel_id } });
    return typeModels;
  }

  async save(typeModel : ICreateTypeModelsDTO) : Promise<TypeModels> {
    const typeModels = await this.repository.save(typeModel);
    return typeModels;
  }

  async list(): Promise <TypeModels[]> {
    const typeModel = await this.repository.find();
    return typeModel;
   }

  async findByName(typeModel_id: number) : Promise<TypeModels> {
  const typeModels = await this.repository.findOne({typeModel_id});
  return typeModels;
  }

}
export {TypeModelRepository};
