import { getRepository, Repository,  } from "typeorm";
import { Criterions } from "../../../entities/Criterions";
import { ICreateCriterionsDTO, ICriterionRepository } from "../../Criterion/ICriterionRepository";

class CriterionRepository implements ICriterionRepository {
  private repository: Repository<Criterions>;
  constructor() {
    this.repository = getRepository(Criterions);
  }
  
  async create (criterion : ICreateCriterionsDTO[]) : Promise<Criterions[]> {
    const criterions = this.repository.create(criterion)
    const responseCriterion = await this.repository.save(criterions);
    return responseCriterion;
  }

  async list(): Promise <Criterions[]> {
    const criterion = await this.repository.find();
    return criterion;
    }
  async findByName(criterion_id: number) : Promise<Criterions> {
    const criterions = await this.repository.findOne({criterion_id});
    return criterions;
  }
  async findOne({ where: { criterion_id } }: { where: { criterion_id: any; }; }): Promise<Criterions> {
    const criterions = await this.repository.findOne({ where: { criterion_id } });
    return criterions;
  }

  async save(criterion : ICreateCriterionsDTO) : Promise<Criterions> {
    const criterions = await this.repository.save(criterion);
    return criterions;
  }

  async deleteCriterion(id_instrument: number): Promise<void> {
    await this.repository.delete({id_instrument});
  }


}

export {CriterionRepository};
