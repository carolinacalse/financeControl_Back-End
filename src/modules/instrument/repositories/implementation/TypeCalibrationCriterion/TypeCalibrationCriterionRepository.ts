
import { getRepository, Repository,  } from "typeorm";
import { TypeCalibrationCriterions } from "../../../entities/TypeCalibrationCriterion";
import { ICreateTypeCalibrationCriterionsDTO, ITypeCalibrationCriterionRepository } from "../../TypeCalibrationCriterion/ITypeCalibrationCriterionRepository";

class TypeCalibrationCriterionRepository implements ITypeCalibrationCriterionRepository {
  private repository : Repository<TypeCalibrationCriterions>;
  constructor() {
  this.repository = getRepository(TypeCalibrationCriterions);
  }

  async createMultiple(criterions: ICreateTypeCalibrationCriterionsDTO[]): Promise<void> {
    const typeCalibrationCriterions = this.repository.create(criterions);
    await this.repository.save(typeCalibrationCriterions);
  }

  async create({
    typeCalibrationCriterion_id,
    criterion_id,
    typeCalibration_id,
    description,
    value,
    statusLine,
    uncertainty,
    error,
    amount, }: ICreateTypeCalibrationCriterionsDTO): Promise<void> {
   const typeCalibrationCriterions = this.repository.create({
    typeCalibrationCriterion_id,
    criterion_id,
    typeCalibration_id,
    description,
    value,
    statusLine,
    uncertainty,
    error,
    amount,
   })
   await this.repository.save(typeCalibrationCriterions);
  }


  async findOne({ where: { typeCalibrationCriterion_id } }: { where: { typeCalibrationCriterion_id: any; }; }): Promise<TypeCalibrationCriterions> {
    const typeCalibrationCriterions = await this.repository.findOne({ where: { typeCalibrationCriterion_id } });
    return typeCalibrationCriterions;
  }

  async save(typeCalibrationCriterion : ICreateTypeCalibrationCriterionsDTO) : Promise<TypeCalibrationCriterions> {
    const typeCalibrationCriterions = await this.repository.save(typeCalibrationCriterion);
    return typeCalibrationCriterions;
  }

  async list(): Promise <TypeCalibrationCriterions[]> {
    const typeCalibrationCriterion = await this.repository.find();
    return typeCalibrationCriterion;
   }

  async findByName(typeCalibrationCriterion_id: number) : Promise<TypeCalibrationCriterions> {
  const typeCalibrationCriterions = await this.repository.findOne({typeCalibrationCriterion_id});
  return typeCalibrationCriterions;
  }

}
export {TypeCalibrationCriterionRepository};
