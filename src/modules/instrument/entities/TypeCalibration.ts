import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_typeCalibrations")
class TypeCalibrations {

@PrimaryGeneratedColumn()
typeCalibration_id: number;

@Column()
docNum: number;

@Column()
dateCalibration: string;

@Column()
nextCalibration: string;

@Column()
finalReport: string;

@Column()
type: string;

@Column()
item: string;

@Column()
provider : string;

@Column()
note: string;

@Column()
status: string;

@Column()
id_model: number;

@Column()
id_instrument: number;

@Column()
id_device: number;

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
export {TypeCalibrations};
