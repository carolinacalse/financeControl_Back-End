import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("financeControl_typeCalibrationCriterion")
class TypeCalibrationCriterions {

@PrimaryGeneratedColumn()
typeCalibrationCriterion_id: number;

@Column()
criterion_id: number;

@Column()
typeCalibration_id: number;

@Column()
description: string;

@Column()
value: string;

@Column()
statusLine: string;

@Column()
uncertainty: number;

@Column()
error: number;

@Column()
amount: number;

@CreateDateColumn()
created_at: Date;

@Column()
cancel: string;

@CreateDateColumn()
cancel_date: Date;

@Column()
cancel_user: string;

}
export {TypeCalibrationCriterions};
