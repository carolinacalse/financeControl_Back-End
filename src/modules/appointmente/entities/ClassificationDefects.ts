import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_classificationDefects")
class ClassificationDefects {

@PrimaryGeneratedColumn()
classificationDefect_id: number;

@Column()
docNum: number;

@Column()
description: string;

@Column()
level: string;

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
export {ClassificationDefects};
