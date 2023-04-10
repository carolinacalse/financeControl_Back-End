import { injectable, inject } from "tsyringe";
import { TypeFrequencys } from "../../../entities/TypeFrequencys";
import { ITypeFrequencyRepository } from "../../../repositories/TypeFrequency/ITypeFrequencyRepository";

interface IRequest {
  typeFrequency_id:number;
  docNum: number;
  description: string;
  inactive: string;
}


@injectable()
class UpdateTypeFrequencyUseCase {
  constructor(
    @inject("TypeFrequencyRepository")
    private typeFrequencyRepository: ITypeFrequencyRepository){}


async execute({
  typeFrequency_id,
   docNum,
   description,
   inactive
  }:IRequest): Promise<TypeFrequencys>{
  const typesFrequencyData = await this.typeFrequencyRepository.findOne({where: {typeFrequency_id: typeFrequency_id}});
  const typeFrequencys = {
    ...typesFrequencyData,
    docNum,
    description,
    inactive };
    await this.typeFrequencyRepository.save(typeFrequencys);
    return (typeFrequencys);
}
}

export {UpdateTypeFrequencyUseCase}
