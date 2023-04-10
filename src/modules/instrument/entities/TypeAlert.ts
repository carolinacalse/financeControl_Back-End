import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_typeAlerts")
class TypeAlerts {

@PrimaryGeneratedColumn()
typeAlert_id: number;

@Column()
docNum: number;

@Column()
partNumber: string;

@Column()
type: string;

@Column()
process: string;

@Column()
id_file: string;

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
export {TypeAlerts};
