import {inject, injectable} from "tsyringe"
import { Appointments } from "../../../entities/Appointments";
import { NotConforms } from "../../../entities/NotConforms";
import { IAppointmenteRepository } from "../../../repositories/Appointmente/IAppointmenteRepository";
import { INotConformRepository } from "../../../repositories/NotConform/INotConformRepository";

interface IRequest {
  id?: number;
  docNum: number;
  create_user?: string;
  status: string;
  op : string;
  nota?: string;
  bch?: string;
  feedstock ?: string;
  partNumber: string;
  client?: string;
  address?: string;
  descriptionInspection?: string;
  firstInspection?: string;
  quantityTotal?: number;
  quantityApproved?: number;
  quantityRejected?: number;
  provider?: string;
  inactive?: string;
  notConform_id?: number;
  problemDescription?: string;
  defectClassification?: string;
  causativeProcess?: string;
  defectType?: string;
  detectedSpot?: string;
  quantityDefect?: number;
  indicator?: string;
  program?: number;
  responsibleOperator?: string;
  shift?: string;
  potentialCause?: string;
  obsPotentialCause?: string;
  actionAccept?: number;
  actionRework?: number;
  actionScrap?: number;
  indicatorScrap?: string;
  detour?: string;
  note?: string;
  scrapDate?: Date;
  unitaryValue?: number;
  amount?: number;
  unitWeight?: number;
  totalWeight?: number;
  rncTerminated?:string;
  workInstruction?: string;
  properWorkInstruction?: string;
  operatorFollowedInstruction?: string;
  trainedOperator?: string;
  machineProblem?: string;
  tooling?: string;
  inherentDefect?: string;
  disposition?: string;
  id_file?: number;
  appointmente_id?: number;
}

interface IResponse {
  appointmente: Appointments,
  notConform: NotConforms
}

@injectable()
class CreateAppointmenteUseCase {
  constructor(
    @inject("AppointmenteRepository")
    private appointmenteRepository: IAppointmenteRepository,
    @inject("NotConformRepository")
    private notConformRepository: INotConformRepository){}

    async execute({
      docNum,
      status,
      create_user,
      op,
      nota,
      bch,
      feedstock,
      partNumber,
      client,
      address,
      descriptionInspection,
      firstInspection,
      quantityTotal,
      quantityApproved,
      quantityRejected,
      provider,
      inactive,
      problemDescription,
      defectClassification,
      causativeProcess,
      defectType ,
      detectedSpot,
      quantityDefect,
      indicator,
      program,
      responsibleOperator,
      shift,
      potentialCause,
      obsPotentialCause,
      actionAccept,
      actionRework,
      actionScrap,
      indicatorScrap,
      detour,
      note,
      scrapDate,
      unitaryValue,
      amount,
      unitWeight,
      totalWeight,
      rncTerminated,
      workInstruction,
      operatorFollowedInstruction,
      trainedOperator,
      machineProblem,
      tooling,
      inherentDefect,
      disposition,
      id_file,
    }: IRequest) : Promise<Appointments> {
    try {
        const appointmente = await this.appointmenteRepository.create({
          docNum,
          status,
          create_user,
          op,
          nota,
          bch,
          feedstock,
          partNumber,
          client,
          address,
          descriptionInspection,
          firstInspection,
          quantityTotal,
          quantityApproved,
          quantityRejected,
          provider,
          inactive,
        });
        if(quantityRejected != 0){
          try{
            const notConform = await this.notConformRepository.create({
              problemDescription,
              defectClassification,
              causativeProcess,
              defectType,
              detectedSpot,
              quantityDefect,
              indicator,
              program,
              responsibleOperator,
              shift,
              potentialCause,
              obsPotentialCause,
              actionAccept,
              actionRework,
              actionScrap,
              indicatorScrap,
              detour,
              note,
              scrapDate,
              unitaryValue,
              amount,
              unitWeight,
              totalWeight,
              rncTerminated,
              workInstruction,
              operatorFollowedInstruction,
              trainedOperator,
              machineProblem,
              tooling,
              inherentDefect,
              disposition: disposition,
              id_file,
              appointmente_id : appointmente.id,
            })

          } catch (error) {
              console.log(error)
          }
        }
        return appointmente;
    } catch (error) {
        console.log(error)
    }
  }
}
export {CreateAppointmenteUseCase};
