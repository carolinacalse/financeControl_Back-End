import { injectable, inject } from "tsyringe";
import { TypeDefects } from "../../../entities/TypeDefects";
import { ITypeDefectRepository } from "../../../repositories/TypeDefect/ITypeDefectRepository";

@injectable()
class ListTypeDefectUseCase {
  constructor(
    @inject("TypeDefectRepository")
    private typeDefectRepository: ITypeDefectRepository){}

  async execute() : Promise<TypeDefects[]>{
    const typeDefect = await this.typeDefectRepository.list();

    return typeDefect;
  }
}
export {ListTypeDefectUseCase}
