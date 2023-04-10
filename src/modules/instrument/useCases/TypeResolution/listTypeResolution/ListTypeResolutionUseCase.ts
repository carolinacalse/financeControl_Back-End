import { injectable, inject } from "tsyringe";
import { TypeResolutions } from "../../../entities/TypeResolution";
import { ITypeResolutionRepository } from "../../../repositories/TypeResolution/ITypeResolutionRepository";

@injectable()
class ListTypeResolutionUseCase {
  constructor(
    @inject("TypeResolutionRepository")
    private typeResolutionRepository: ITypeResolutionRepository){}

  async execute() : Promise<TypeResolutions[]>{
    const typeResolution = await this.typeResolutionRepository.list();

    return typeResolution;
  }
}
export {ListTypeResolutionUseCase}
