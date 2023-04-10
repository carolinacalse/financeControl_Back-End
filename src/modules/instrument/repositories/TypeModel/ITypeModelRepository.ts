import { TypeModels } from "../../entities/TypeModel";


interface ICreateTypeModelsDTO {
  typeModel_id?: number;
  docNum: number;
  developed: string;
  frequency:string;
  location: string;
  responsible: string;
  customer: string;
  status: string;
  positionID?: number;
  positionDescription?: string;
  inactive?: string;
}

interface ITypeModelRepository {
  findByName(typeModel_id: number): Promise<TypeModels>;
  findOne({ where: { typeModel_id } }: { where: { typeModel_id: any } }): Promise<TypeModels>;
  list(): Promise<TypeModels[]>;
  save(typeInstrument : ICreateTypeModelsDTO): Promise<TypeModels>;
  create ({docNum, developed, frequency, location, responsible, customer, status, positionID, positionDescription}: ICreateTypeModelsDTO) : Promise<TypeModels>;

}
export {ITypeModelRepository, ICreateTypeModelsDTO};
