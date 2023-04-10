import {Entity, PrimaryGeneratedColumn,Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_instruments")
class Instruments {

  @PrimaryGeneratedColumn()
  id_instrument: number;

  @Column()
  docNum: number;

  @Column()
  description: string;

  @Column()
  note: string;

  @Column()
  status: string;

  @Column()
  frequency: string;

  @Column()
  localization: string;

  @Column()
  responsible: string;

  @Column()
  acquisition : string;

  @Column()
  itemCodePurchase: string;

  @Column()
  itemCodeService: string;

  @Column()
  inactive: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  cancel: string;

  @CreateDateColumn()
  cancel_date: Date;

  @Column()
  cancel_user: string;

}

export {Instruments};
