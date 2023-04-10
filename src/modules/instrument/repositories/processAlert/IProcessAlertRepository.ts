import { ProcessAlert } from "../../entities/ProcessAlert";

interface IProcessAlertDTO {
    process_alert_id?: number;
    typeAlert_id: number;
    process: string;
}

interface IProcessAlertRepository {

    findById(process_alert_id: number): Promise<ProcessAlert>;
    findOne({ where: { process_alert_id } }: { where: { process_alert_id: any } }): Promise<ProcessAlert>;
    list(): Promise<ProcessAlert[]>;
    save(typeInstrument : IProcessAlertDTO): Promise<ProcessAlert>;
    create (newProcessAlert: IProcessAlertDTO[]) : Promise<void>;

}

export {IProcessAlertRepository, IProcessAlertDTO};