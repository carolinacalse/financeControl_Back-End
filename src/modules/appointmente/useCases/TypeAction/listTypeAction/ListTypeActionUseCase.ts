import { injectable, inject } from "tsyringe";
import { TypeActions } from "../../../entities/TypeAction";
import { ITypeActionRepository } from "../../../repositories/TypeAction/ITypeActionRepository";

@injectable()
class ListTypeActionUseCase {
  constructor(
    @inject("TypeActionRepository")
    private typeActionRepository: ITypeActionRepository){}

  async execute() : Promise<TypeActions[]>{
    const typeAction = await this.typeActionRepository.list();

    return typeAction;
  }
}
export {ListTypeActionUseCase}
