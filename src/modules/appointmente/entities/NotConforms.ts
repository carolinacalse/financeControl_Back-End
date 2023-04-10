import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_notConforms")
class NotConforms {

  @PrimaryGeneratedColumn()
  notConform_id: number;

  @Column()
  problemDescription: string;

  @Column()
  defectClassification: string;

  @Column()
  causativeProcess: string;

  @Column()
  defectType: string;

  @Column()
  detectedSpot: string;

  @Column()
  quantityDefect: number;

  @Column()
  indicator: string;

  @Column()
  program: number;

  @Column()
  responsibleOperator: string;

  @Column()
  shift: string;

  @Column()
  potentialCause: string;

  @Column()
  obsPotentialCause: string;

  @Column()
  actionAccept: number;

  @Column()
  actionRework: number;

  @Column()
  actionScrap: number;

  @Column()
  indicatorScrap: string;

  @Column()
  detour: string;

  @Column()
  note: string;

  @Column()
  scrapDate: Date;

  @Column()
  unitaryValue: number;

  @Column()
  amount: number;

  @Column()
  unitWeight: number;

  @Column()
  totalWeight: number;

  @Column()
  workInstruction: string;

  @Column()
  operatorFollowedInstruction: string;

  @Column()
  trainedOperator: string;

  @Column()
  machineProblem: string;

  @Column()
  tooling: string;

  @Column()
  rncTerminated: string;

  @Column()
  inherentDefect: string;

  @Column()
  disposition: string;

  @Column()
  id_file: number;

  @Column()
  appointmente_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  cancel: string;

  @CreateDateColumn()
  cancel_date: Date;

  @Column()
  create_user: string;

  @Column()
  cancel_user: string;

}

export {NotConforms};
