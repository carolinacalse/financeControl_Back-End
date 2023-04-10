import { TypeRangeUses } from "../../entities/TypeRangeUses";

interface ICreateTypeRangeUsesDTO {
  typeRangeUse_id?: number;
  docNum: number;
  minimum: string;
  maximum: string;
  inactive?: string;
}

interface ITypeRangeUseRepository {
  findByName(typeRangeUse_id: number): Promise<TypeRangeUses>;
  findOne({ where: { typeRangeUse_id } }: { where: { typeRangeUse_id: any } }): Promise<TypeRangeUses>;
  list(): Promise<TypeRangeUses[]>;
  save(typeRangeUse : ICreateTypeRangeUsesDTO): Promise<TypeRangeUses>;
  create ({docNum, minimum, maximum, }: ICreateTypeRangeUsesDTO) : Promise<void>;

}
export {ITypeRangeUseRepository, ICreateTypeRangeUsesDTO};
