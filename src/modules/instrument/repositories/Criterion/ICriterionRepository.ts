import { Criterions } from "../../entities/Criterions";


interface ICreateCriterionsDTO {
  criterion_id?: number;
  typeCriterion_id?: number;
  typeResolution_id?: number;
  typeRangeUse_id?: number;
  id_instrument?: number;

}

interface ICriterionRepository {
  findByName(criterion_id: number): Promise<Criterions>;
  save(criterion : ICreateCriterionsDTO): Promise<Criterions>;
  findOne({ where: { criterion_id } }: { where: { criterion_id: any } }): Promise<Criterions>;
  list(): Promise<Criterions[]>;
  create(criterion: ICreateCriterionsDTO[]) : Promise<Criterions[]>;
  deleteCriterion( id_instrument: number ): Promise <void>
}
export {ICriterionRepository, ICreateCriterionsDTO};

