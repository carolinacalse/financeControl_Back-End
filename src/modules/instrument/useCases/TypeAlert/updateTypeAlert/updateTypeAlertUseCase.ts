import { injectable, inject } from "tsyringe";
import { TypeAlerts } from "../../../entities/TypeAlert";
import { ITypeAlertRepository } from "../../../repositories/TypeAlert/ITypeAlertRepository";

interface IRequest {
  typeAlert_id: number;
  docNum: number;
  partNumber: string;
  type: string;
  process: string;
  id_file: string;
  inactive: string;
}


@injectable()
class UpdateTypeAlertUseCase {
  constructor(
    @inject("TypeAlertRepository")
    private typeAlertRepository: ITypeAlertRepository){}


async execute({
    typeAlert_id,
    docNum,
    partNumber,
    type,
    process,
    id_file,
    inactive
  }:IRequest): Promise<TypeAlerts>{
  const typesAlertData = await this.typeAlertRepository.findOne({where: {typeAlert_id: typeAlert_id}});
  const typeAlerts = {
    ...typesAlertData,
    typeAlert_id,
    docNum,
    partNumber,
    type,
    process,
    id_file,
    inactive };
    await this.typeAlertRepository.save(typeAlerts);
    return (typeAlerts);
}
}

export {UpdateTypeAlertUseCase}
