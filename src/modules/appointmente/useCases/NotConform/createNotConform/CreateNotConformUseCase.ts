import {inject, injectable} from "tsyringe"
import { NotConforms } from "../../../entities/NotConforms";
import { INotConformRepository } from "../../../repositories/NotConform/INotConformRepository";


interface IRequest {
  notConform_id?: number;
  problemDescription?: string;
  defectClassification?: string;
  causativeProcess?: string;
  defectType ?: string;
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
  rncTerminated?: string;
  workInstruction?: string;
  properWorkInstruction?: string;
  operatorFollowedInstruction?: string;
  trainedOperator?: string;
  machineProblem?: string;
  tooling?: string;
  inherentDefect?: string;
  id_file?: number;
  appointmente_id?: number;
}

@injectable()
class CreateNotConformUseCase {
  constructor(
    @inject("NotConformRepository")
    private notConformRepository: INotConformRepository){}

 async execute({
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
      properWorkInstruction,
      operatorFollowedInstruction,
      trainedOperator,
      machineProblem,
      tooling,
      inherentDefect,
      id_file,
      appointmente_id,}: IRequest) : Promise<NotConforms> {

    try {

     const responseNotConform = await this.notConformRepository.create({
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
            properWorkInstruction,
            operatorFollowedInstruction,
            trainedOperator,
            machineProblem,
            tooling,
            inherentDefect,
            id_file,
            appointmente_id,
          });
        return responseNotConform;
      } catch (error) {
        console.log(error);
      }
  }
}

export {CreateNotConformUseCase};
