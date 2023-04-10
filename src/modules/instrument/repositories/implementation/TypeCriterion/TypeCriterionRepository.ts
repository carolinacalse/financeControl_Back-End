
import { getRepository, Repository,  } from "typeorm";
import { TypeCriterions } from "../../../entities/TypeCriterion";
import { ITypeCriterionRepository, ICreateTypeCriterionsDTO  } from "../../TypeCriterion/ITypeCriterionRepository";

class TypeCriterionRepository implements ITypeCriterionRepository {
  private repository : Repository<TypeCriterions>;
  constructor() {
  this.repository = getRepository(TypeCriterions);
  }

  async create({ typeCriterion_id,docNum, description, value}: ICreateTypeCriterionsDTO): Promise<void> {
   const typeCriterions = this.repository.create({
    typeCriterion_id,
    docNum,
    description,
    value,
   })
   await this.repository.save(typeCriterions);
  }


  async findOne({ where: { typeCriterion_id } }: { where: { typeCriterion_id: any; }; }): Promise<TypeCriterions> {
    const typeCriterions = await this.repository.findOne({ where: { typeCriterion_id } });
    return typeCriterions;
  }

  async save(typeCriterion : ICreateTypeCriterionsDTO) : Promise<TypeCriterions> {
    const typeCriterions = await this.repository.save(typeCriterion);
    return typeCriterions;
  }

  async list(): Promise <TypeCriterions[]> {
    const typeCriterion = await this.repository.find();
    return typeCriterion;
   }

  async findByName(typeCriterion_id: number) : Promise<TypeCriterions> {
  const typeCriterions = await this.repository.findOne({typeCriterion_id});
  return typeCriterions;
  }

}
export {TypeCriterionRepository};
