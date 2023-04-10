import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../errors/AppError";
import { ProcessAlert } from "../../../entities/ProcessAlert";
import { TypeAlerts } from "../../../entities/TypeAlert";
import { IProcessAlertRepository } from "../../../repositories/processAlert/IProcessAlertRepository";
import { ITypeAlertRepository } from "../../../repositories/TypeAlert/ITypeAlertRepository";

interface IRequest{
  typeAlert_id?: number;
  docNum: number;
  partNumber: string;
  type: string;
  process?: string;
  id_file?: string;
  inactive: string;
  process_alert: [
    {
      process_alert_id?: number;
      typeAlert_id: number;
      process: string;
      tl_subgroup: string;

    }
  ]
}

interface IResponse {
  alerta: TypeAlerts,
  process_alert: ProcessAlert,
}

@injectable()
class CreateTypeAlertUseCase {
  constructor(
    @inject("TypeAlertRepository")
    private typeAlertRepository: ITypeAlertRepository,
    @inject("ProcessAlertRepository")
    private processAlertRepository: IProcessAlertRepository
    ) {}

  async execute({
    docNum, 
    partNumber, 
    type, 
    id_file, 
    inactive, 
    process_alert
  }: IRequest) : Promise<TypeAlerts> {
    try {
      const alerta = await this.typeAlertRepository.create({
        docNum,
        partNumber,
        type,
        id_file,
        inactive,
      });
      
      try {
        let newProcessAlert = [];
        if(process_alert){
          for(let index=0; index < process_alert.length; index+=1) {
            newProcessAlert.push({
              typeAlert_id: alerta.typeAlert_id,
              process: process_alert[index].tl_subgroup,
            })
          }
          if(newProcessAlert.length > 0) {
              await this.processAlertRepository.create(newProcessAlert)
          }
        }
      } catch (error) {
        console.log(error)
      }
      return (alerta);
    } catch (error) {
      console.log(error)
    }
  }
}

export {CreateTypeAlertUseCase};
