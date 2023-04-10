import {Entity, PrimaryGeneratedColumn,Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_criterions")
class Criterions {

  @PrimaryGeneratedColumn()
  criterion_id : number;

  @Column()
  typeCriterion_id: number;

  @Column()
  typeResolution_id: number;

  @Column()
  typeRangeUse_id: number;

  @Column()
  id_instrument: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  cancel: string;

  @CreateDateColumn()
  cancel_date: Date;

  @Column()
  cancel_user: string;

}

export {Criterions};
