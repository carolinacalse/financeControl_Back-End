import { injectable, inject } from "tsyringe";
import { TypeAlerts } from "../../../entities/TypeAlert";
import { ITypeAlertRepository } from "../../../repositories/TypeAlert/ITypeAlertRepository";

@injectable()
class ListTypeAlertUseCase {
  constructor(
    @inject("TypeAlertRepository")
    private typeAlertRepository: ITypeAlertRepository){}

  async execute() : Promise<TypeAlerts[]>{
    const typeAlert = await this.typeAlertRepository.list();

    return typeAlert;
  }
}
export {ListTypeAlertUseCase}
