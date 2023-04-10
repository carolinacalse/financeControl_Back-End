import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("financeControl_typeRangeUses")
class TypeRangeUses {

@PrimaryGeneratedColumn()
typeRangeUse_id: number;

@Column()
docNum: number;

@Column()
minimum: string;

@Column()
maximum: string;

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
export {TypeRangeUses};
