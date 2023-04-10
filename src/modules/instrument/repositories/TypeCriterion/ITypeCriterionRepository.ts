import { TypeCriterions } from "../../entities/TypeCriterion";


interface ICreateTypeCriterionsDTO {
  typeCriterion_id?: number;
  docNum: number;
  description: string;
  value: string;
  inactive?: string;
}

interface ITypeCriterionRepository {
  findByName(typeCriterion_id: number): Promise<TypeCriterions>;
  findOne({ where: { typeCriterion_id } }: { where: { typeCriterion_id: any } }): Promise<TypeCriterions>;
  list(): Promise<TypeCriterions[]>;
  save(typeCriterion : ICreateTypeCriterionsDTO): Promise<TypeCriterions>;
  /* update (typeCriterion_id,description, inactive): Promise<TypeCriterions>; */
  create ({docNum, description, value, }: ICreateTypeCriterionsDTO) : Promise<void>;

}
export {ITypeCriterionRepository, ICreateTypeCriterionsDTO};
