import { injectable, inject } from "tsyringe";
import { TypeFrequencys } from "../../../entities/TypeFrequencys";
import { ITypeFrequencyRepository } from "../../../repositories/TypeFrequency/ITypeFrequencyRepository";

@injectable()
class ListTypeFrequencyUseCase {
  constructor(
    @inject("TypeFrequencyRepository")
    private typeFrequencyRepository: ITypeFrequencyRepository){}

  async execute() : Promise<TypeFrequencys[]>{
    const typeFrequency = await this.typeFrequencyRepository.list();

    return typeFrequency;
  }
}
export {ListTypeFrequencyUseCase}
