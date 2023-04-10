import { injectable, inject } from "tsyringe";
import { TypeDispositions } from "../../../entities/TypeDisposition";
import { ITypeDispositionRepository } from "../../../repositories/TypeDisposition/ITypeDispositionRepository";

@injectable()
class ListTypeDispositionUseCase {
  constructor(
    @inject("TypeDispositionRepository")
    private typeDispositionRepository: ITypeDispositionRepository){}

  async execute() : Promise<TypeDispositions[]>{
    const typeDisposition = await this.typeDispositionRepository.list();

    return typeDisposition;
  }
}
export {ListTypeDispositionUseCase}
