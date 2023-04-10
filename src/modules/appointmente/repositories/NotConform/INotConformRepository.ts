import { NotConforms } from "../../entities/NotConforms";

interface ICreateNotConformsDTO {
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
  rncTerminated?: string
  workInstruction?: string;
  properWorkInstruction?: string;
  operatorFollowedInstruction?: string;
  trainedOperator?: string;
  machineProblem?: string;
  tooling?: string;
  inherentDefect?: string;
  id_file?: number;
  appointmente_id?: number;
  disposition?: string;
}

interface INotConformRepository {
  findByName(notConform_id: number): Promise<NotConforms>;
  save(notConform : ICreateNotConformsDTO): Promise<NotConforms>;
  findOne({ where: { notConform_id } }: { where: { notConform_id: any } }): Promise<NotConforms>;
  list(): Promise<NotConforms[]>;
  create(notConform: ICreateNotConformsDTO) : Promise<NotConforms>;

}
export {INotConformRepository, ICreateNotConformsDTO};

