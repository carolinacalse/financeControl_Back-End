import {Entity, PrimaryGeneratedColumn,Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_typeLocals")
class TypeLocals {

@PrimaryGeneratedColumn()
typeLocal_id: number;
@Column()
docNum: number;

@Column()
group: string;

@Column()
subgroup: string;

@Column()
type: string;

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
export {TypeLocals};
