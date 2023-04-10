import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_typeImages")
class TypeImages {

@PrimaryGeneratedColumn()
typeImages_id: number;

@Column()
image_name: string;

@Column()
image_url: string;

@Column()
typeDevice_id : number;

@Column()
typeModel_id: number;

@Column()
typeCalibration_id: number;

@Column()
id_instrument: number;

@Column()
id_appointment: number;

@Column()
typealert_id: number;

@Column()
id_action: number;

@Column()
selected: string;

@CreateDateColumn()
created_at: Date;

@Column()
cancel: string;

@CreateDateColumn()
cancel_date: Date;

@Column()
cancel_user: string;

}
export {TypeImages};
