import { injectable, inject } from "tsyringe";
import { NotConforms } from "../../../entities/NotConforms";
import { INotConformRepository } from "../../../repositories/NotConform/INotConformRepository";

interface IRequest {
  notConform_id: number;
  problemDescription: string;
  defectClassification: string;
  causativeProcess: string;
  defectType : string;
  detectedSpot: string;
  quantityDefect: number;
  indicator: string;
  program: number;
  responsibleOperator: string;
  shift: string;
  potentialCause: string;
  obsPotentialCause: string;
  actionAccept: number;
  actionRework: number;
  actionScrap: number;
  indicatorScrap: string;
  detour: string;
  note: string;
  scrapDate: Date;
  unitaryValue?: number;
  amount?: number;
  unitWeight?: number;
  totalWeight?: number;
  rncTerminated: string;
  workInstruction: string;
  properWorkInstruction: string;
  operatorFollowedInstruction: string;
  trainedOperator: string;
  machineProblem: string;
  tooling: string;
  inherentDefect: string;
  disposition?: string;
  id_file: number;
}


@injectable()
class UpdateNotConformUseCase {
  constructor(
    @inject("NotConformRepository")
    private notConformRepository: INotConformRepository){}

  async execute({
    notConform_id,
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
    disposition,
    id_file,
  }:IRequest): Promise<NotConforms>{
    const notConformData = await this.notConformRepository.findOne({where: {notConform_id: notConform_id}});
    const notConforms = {
      ...notConformData,
      notConform_id: Number(notConform_id),
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
      disposition,
      id_file,
    };
    const notConformSaved = await this.notConformRepository.save(notConforms);
    return (notConforms);
  }
}

export {UpdateNotConformUseCase}
