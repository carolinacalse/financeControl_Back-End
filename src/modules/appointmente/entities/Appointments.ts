import {Entity, PrimaryGeneratedColumn,Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_appointments")
class Appointments {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  docNum: number;

  @Column()
  status: string;

  @Column()
  op: string;

  @Column()
  nota: string;

  @Column()
  bch: string;

  @Column()
  feedstock: string;

  @Column()
  partNumber: string;

  @Column()
  client: string;

  @Column()
  address: string;

  @Column()
  descriptionInspection: string;

  @Column()
  firstInspection: string;

  @Column()
  quantityTotal: number;

  @Column()
  quantityApproved: number;

  @Column()
  quantityRejected: number;

  @Column()
  provider: string;

  @Column()
  inactive: string;

  @Column()
  create_user: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  cancel: string;

  @CreateDateColumn()
  cancel_date: Date;

  @Column()
  cancel_user: string;

}

export {Appointments};
