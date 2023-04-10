import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "../../../../accounts/repositories/IUsersRepository";
import { TypeDispositions } from "../../../entities/TypeDisposition";
import { ITypeDispositionRepository } from "../../../repositories/TypeDisposition/ITypeDispositionRepository";

interface IRequest {
  typeDisposition_id:number;
  docNum: number;
  description: string;
  inactive: string;
}


@injectable()
class UpdateTypeDispositionUseCase {
  constructor(
    @inject("TypeDispositionRepository")
    private typeDispositionRepository: ITypeDispositionRepository){}


async execute({
  typeDisposition_id,
   docNum,
   description,
   inactive
  }:IRequest): Promise<TypeDispositions>{
  const typesDispositionData = await this.typeDispositionRepository.findOne({where: {typeDisposition_id: typeDisposition_id}});
  const typeDispositions = {
    ...typesDispositionData,
    docNum,
    description,
    inactive };
    await this.typeDispositionRepository.save(typeDispositions);
    return (typeDispositions);
}
}

export {UpdateTypeDispositionUseCase}
