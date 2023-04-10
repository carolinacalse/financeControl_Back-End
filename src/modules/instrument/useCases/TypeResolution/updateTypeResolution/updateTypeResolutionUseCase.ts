import { injectable, inject } from "tsyringe";
import { TypeResolutions } from "../../../entities/TypeResolution";
import { ITypeResolutionRepository } from "../../../repositories/TypeResolution/ITypeResolutionRepository";

interface IRequest {
  typeResolution_id:number;
  docNum: number;
  description: string;
  inactive: string;
}


@injectable()
class UpdateTypeResolutionUseCase {
  constructor(
    @inject("TypeResolutionRepository")
    private typeResolutionRepository: ITypeResolutionRepository){}


async execute({
  typeResolution_id,
   docNum,
   description,
   inactive
  }:IRequest): Promise<TypeResolutions>{
  const typesResolutionData = await this.typeResolutionRepository.findOne({where: {typeResolution_id: typeResolution_id}});
  const typeResolutions = {
    ...typesResolutionData,
    docNum,
    description,
    inactive };
    await this.typeResolutionRepository.save(typeResolutions);
    return (typeResolutions);
}
}

export {UpdateTypeResolutionUseCase}
