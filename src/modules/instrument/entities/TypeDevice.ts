import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_typeDevices")
class TypeDevices {

@PrimaryGeneratedColumn()
typeDevice_id: number;

@Column()
docNum: number;

@Column()
developed: string;

@Column()
location: string;

@Column()
responsible: string;

@Column()
frequency: string;

@Column()
customer: string;

@Column()
status: string;

@Column()
criterion: string;

@Column()
note: string;

@Column()
positionID: number;

@Column()
positionDescription: string;

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
export {TypeDevices};
