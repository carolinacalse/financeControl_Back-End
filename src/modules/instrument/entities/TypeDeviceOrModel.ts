import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_typeDeviceOrModels")
class TypeDeviceOrModels {

@PrimaryGeneratedColumn()
typeDeviceOrModel_id: number;

@Column()
item: string;

@Column()
device_id: number;

@Column()
model_id: number;

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
export {TypeDeviceOrModels};

