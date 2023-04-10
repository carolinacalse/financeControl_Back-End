import { TypeDispositions } from "../../entities/TypeDisposition";

interface ICreateTypeDispositionsDTO {
  typeDisposition_id: number;
  docNum: number;
  description: string;
  inactive: string;
}

interface ITypeDispositionRepository {
  findByName(typeDisposition_id: number): Promise<TypeDispositions>;
  findOne({ where: { typeDisposition_id } }: { where: { typeDisposition_id: any } }): Promise<TypeDispositions>;
  list(): Promise<TypeDispositions[]>;
  save(typeDisposition : ICreateTypeDispositionsDTO): Promise<TypeDispositions>;
  /* update (typeDisposition_id,description, inactive): Promise<TypeDispositions>; */
  create ({docNum, description, }: ICreateTypeDispositionsDTO) : Promise<void>;

}
export {ITypeDispositionRepository, ICreateTypeDispositionsDTO};
