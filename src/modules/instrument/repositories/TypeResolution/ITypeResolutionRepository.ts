import { TypeResolutions } from "../../entities/TypeResolution";


interface ICreateTypeResolutionsDTO {
  typeResolution_id?: number;
  docNum: number;
  description: string;
  inactive?: string;
}

interface ITypeResolutionRepository {
  findByName(typeResolution_id: number): Promise<TypeResolutions>;
  findOne({ where: { typeResolution_id } }: { where: { typeResolution_id: any } }): Promise<TypeResolutions>;
  list(): Promise<TypeResolutions[]>;
  save(typeResolution : ICreateTypeResolutionsDTO): Promise<TypeResolutions>;
  create ({docNum, description, }: ICreateTypeResolutionsDTO) : Promise<void>;

}
export {ITypeResolutionRepository, ICreateTypeResolutionsDTO};
