import { injectable, inject } from "tsyringe";
import { TypeRangeUses } from "../../../entities/TypeRangeUses";
import { ITypeRangeUseRepository } from "../../../repositories/TypeRangeUse/ITypeRangeUseRepository";

interface IRequest {
  typeRangeUse_id:number;
  docNum: number;
  minimum: string;
  maximum: string;
  inactive: string;
}


@injectable()
class UpdateTypeRangeUseUseCase {
  constructor(
    @inject("TypeRangeUseRepository")
    private typeRangeUseRepository: ITypeRangeUseRepository){}


async execute({
  typeRangeUse_id,
   docNum,
   minimum,
   maximum,
   inactive
  }:IRequest): Promise<TypeRangeUses>{
  const typesRangeUseData = await this.typeRangeUseRepository.findOne({where: {typeRangeUse_id: typeRangeUse_id}});
  const typeRangeUses = {
    ...typesRangeUseData,
    docNum,
    minimum,
    maximum,
    inactive };
    await this.typeRangeUseRepository.save(typeRangeUses);
    return (typeRangeUses);
}
}

export {UpdateTypeRangeUseUseCase}
