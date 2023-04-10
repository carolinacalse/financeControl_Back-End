import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "../../../../accounts/repositories/IUsersRepository";
import { TypeDefects } from "../../../entities/TypeDefects";
import { ITypeDefectRepository } from "../../../repositories/TypeDefect/ITypeDefectRepository";

interface IRequest {
  typeDefect_id:number;
  docNum: number;
  description: string;
  inactive: string;
}


@injectable()
class UpdateTypeDefectUseCase {
  constructor(
    @inject("TypeDefectRepository")
    private typeDefectRepository: ITypeDefectRepository){}


async execute({
  typeDefect_id,
   docNum,
   description,
   inactive
  }:IRequest): Promise<TypeDefects>{
  const typesDefectData = await this.typeDefectRepository.findOne({where: {typeDefect_id: typeDefect_id}});
  const typeDefects = {
    ...typesDefectData,
    docNum,
    description,
    inactive };
    await this.typeDefectRepository.save(typeDefects);
    return (typeDefects);
}
}

export {UpdateTypeDefectUseCase}
