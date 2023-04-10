import { injectable, inject } from "tsyringe";
import { TypeModels } from "../../../entities/TypeModel";
import { ITypeModelRepository } from "../../../repositories/TypeModel/ITypeModelRepository";

@injectable()
class ListTypeModelUseCase {
  constructor(
    @inject("TypeModelRepository")
    private typeModelRepository: ITypeModelRepository){}

  async execute() : Promise<TypeModels[]>{
    const typeModel = await this.typeModelRepository.list();

    return typeModel;
  }
}
export {ListTypeModelUseCase}
