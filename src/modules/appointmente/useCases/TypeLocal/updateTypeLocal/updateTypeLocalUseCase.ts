import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "../../../../accounts/repositories/IUsersRepository";
import { TypeLocals } from "../../../entities/TypeLocal";
import { ITypeLocalRepository } from "../../../repositories/TypeLocal/ITypeLocalRepository";

interface IRequest {
  typeLocal_id:number;
  docNum: number;
  group: string;
  subgroup: string;
  type: string;
  inactive: string;
}


@injectable()
class UpdateTypeLocalUseCase {
  constructor(
    @inject("TypeLocalRepository")
    private typeLocalRepository: ITypeLocalRepository){}


async execute({
  typeLocal_id,
   docNum,
   group,
   subgroup,
   type,
   inactive
  }:IRequest): Promise<TypeLocals>{
  const typesLocalData = await this.typeLocalRepository.findOne({where: {typeLocal_id: typeLocal_id}});
  const typeLocals = {
    ...typesLocalData,
    docNum,
    group,
    subgroup,
    type,
    inactive };
    await this.typeLocalRepository.save(typeLocals);
    return (typeLocals);
}
}

export {UpdateTypeLocalUseCase}
