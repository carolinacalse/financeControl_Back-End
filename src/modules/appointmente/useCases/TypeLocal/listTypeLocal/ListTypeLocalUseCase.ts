import { injectable, inject } from "tsyringe";
import { TypeLocals } from "../../../entities/TypeLocal";
import { ITypeLocalRepository } from "../../../repositories/TypeLocal/ITypeLocalRepository";

@injectable()
class ListTypeLocalUseCase {
  constructor(
    @inject("TypeLocalRepository")
    private typeLocalRepository: ITypeLocalRepository){}

  async execute() : Promise<TypeLocals[]>{
    const typeLocal = await this.typeLocalRepository.list();

    return typeLocal;
  }
}
export {ListTypeLocalUseCase}
