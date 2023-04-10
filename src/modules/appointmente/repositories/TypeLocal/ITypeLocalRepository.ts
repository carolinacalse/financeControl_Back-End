import { TypeLocals } from "../../entities/TypeLocal";

interface ICreateTypeLocalsDTO {
  typeLocal_id?: number;
  docNum: number;
  group: string;
  subgroup: string;
  type: string;
}

interface ITypeLocalRepository {
  findByName(typeLocal_id: number): Promise<TypeLocals>;
  findOne({ where: { typeLocal_id } }: { where: { typeLocal_id: any } }): Promise<TypeLocals>;
  list(): Promise<TypeLocals[]>;
  save(typeLocal : ICreateTypeLocalsDTO): Promise<TypeLocals>;
  create ({docNum, group, subgroup, type }: ICreateTypeLocalsDTO) : Promise<void>;

}
export {ITypeLocalRepository, ICreateTypeLocalsDTO};
