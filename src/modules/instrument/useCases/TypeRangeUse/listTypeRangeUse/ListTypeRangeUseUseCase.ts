import { injectable, inject } from "tsyringe";
import { TypeRangeUses } from "../../../entities/TypeRangeUses";
import { ITypeRangeUseRepository } from "../../../repositories/TypeRangeUse/ITypeRangeUseRepository";

@injectable()
class ListTypeRangeUseUseCase {
  constructor(
    @inject("TypeRangeUseRepository")
    private typeRangeUseRepository: ITypeRangeUseRepository){}

  async execute() : Promise<TypeRangeUses[]>{
    const typeRangeUse = await this.typeRangeUseRepository.list();

    return typeRangeUse;
  }
}
export {ListTypeRangeUseUseCase}
