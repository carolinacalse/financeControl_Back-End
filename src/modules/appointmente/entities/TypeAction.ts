import {Entity, PrimaryGeneratedColumn,Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_typeActions")
class TypeActions {

@PrimaryGeneratedColumn()
typeAction_id: number;

@Column()
docNum: number;

@Column()
description: string;

@Column()
follow: string;

@Column()
type: string;

@Column()
responsible: string;

@Column()
email_adress: string;

@Column()
deadline: Date;

@Column()
status: string;

@Column()
action: string;

@Column()
comments: string;

@Column()
action_origin: string;

@Column()
localization: string;

@Column()
id_rnc: number;

@Column()
externalAction: string;

@Column()
action_terminated: string;

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

export {TypeActions};
