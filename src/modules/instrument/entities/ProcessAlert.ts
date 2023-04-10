import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("financeControl_process_alert")
class ProcessAlert {

    @PrimaryGeneratedColumn()
    process_alert_id: number;

    @Column()
    typeAlert_id: number;

    @Column()
    process: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    cancel: string;

    @CreateDateColumn()
    cancel_date: Date;

    @Column()
    cancel_user: string;

}

export {ProcessAlert};
