import { TypeDefects } from "../../entities/TypeDefects";

interface ICreateTypeDefectsDTO {
  typeDefect_id: number;
  docNum: number;
  description: string;
  inactive: string;
}

interface ITypeDefectRepository {
  findByName(typeDefect_id: number): Promise<TypeDefects>;
  findOne({ where: { typeDefect_id } }: { where: { typeDefect_id: any } }): Promise<TypeDefects>;
  list(): Promise<TypeDefects[]>;
  save(typeDefect : ICreateTypeDefectsDTO): Promise<TypeDefects>;
  /* update (typeDefect_id,description, inactive): Promise<TypeDefects>; */
  create ({docNum, description, }: ICreateTypeDefectsDTO) : Promise<void>;

}
export {ITypeDefectRepository, ICreateTypeDefectsDTO};
