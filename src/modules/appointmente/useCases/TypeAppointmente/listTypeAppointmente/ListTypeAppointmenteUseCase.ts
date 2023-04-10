import { injectable, inject } from "tsyringe";
import { TypeAppointmente } from "../../../entities/TypeAppointmente";
import { ITypeAppointmenteRepository } from "../../../repositories/TypeAppointmente/ITypeAppointmenteRepository";

@injectable()
class ListTypeAppointmenteUseCase {
  constructor(
    @inject("TypeAppointmenteRepository")
    private typeAppointmenteRepository: ITypeAppointmenteRepository){}

  async execute() : Promise<TypeAppointmente[]>{
    const typeAppointmente = await this.typeAppointmenteRepository.list();

    return typeAppointmente;
  }
}
export {ListTypeAppointmenteUseCase}
