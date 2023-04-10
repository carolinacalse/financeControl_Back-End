import { injectable, inject } from "tsyringe";
import { TypeAppointmente } from "../../../entities/TypeAppointmente";
import { ITypeAppointmenteRepository } from "../../../repositories/TypeAppointmente/ITypeAppointmenteRepository";

interface IRequest {
  typeAppointmente_id:number;
  docNum: number;
  description: string;
  inactive: string;
}


@injectable()
class UpdateTypeAppointmenteUseCase {
  constructor(
    @inject("TypeAppointmenteRepository")
    private typeAppointmenteRepository: ITypeAppointmenteRepository){}


async execute({
  typeAppointmente_id,
   docNum,
   description,
   inactive
  }:IRequest): Promise<TypeAppointmente>{
  const typesAppointmenteData = await this.typeAppointmenteRepository.findOne({where: {typeAppointmente_id: typeAppointmente_id}});
  const typeAppointmentes = {
    ...typesAppointmenteData,
    docNum,
    description,
    inactive };
    await this.typeAppointmenteRepository.save(typeAppointmentes);
    return (typeAppointmentes);
}
}

export {UpdateTypeAppointmenteUseCase}
