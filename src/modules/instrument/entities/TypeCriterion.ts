import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("financeControl_typeCriterions")
class TypeCriterions {

@PrimaryGeneratedColumn()
typeCriterion_id: number;

@Column()
docNum: number;

@Column()
description: string;

@Column()
value: string;

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
export {TypeCriterions};
