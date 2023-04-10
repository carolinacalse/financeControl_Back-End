import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_typeFrequencys")
class TypeFrequencys {

@PrimaryGeneratedColumn()
typeFrequency_id: number;

@Column()
docNum: number;

@Column()
description: string;

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
export {TypeFrequencys};
