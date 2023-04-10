import { Repository, getRepository } from 'typeorm';
import { ProcessAlert } from '../../../entities/ProcessAlert';
import { IProcessAlertDTO, IProcessAlertRepository } from '../../processAlert/IProcessAlertRepository';

class ProcessAlertRepository implements IProcessAlertRepository {
    private repository: Repository<ProcessAlert>;
    constructor() {
        this.repository = getRepository(ProcessAlert)
    }

    async findById(process_alert_id: number): Promise<ProcessAlert> {
        const process_alert = this.repository.findOne({ where: { process_alert_id } });
        return process_alert; 
    }

    async findOne({ where: { process_alert_id } }: { where: { process_alert_id: any; }; }): Promise<ProcessAlert> {
        const process_alert = this.repository.findOne({ where: { process_alert_id } });
        return process_alert;
    }

    async list(): Promise<ProcessAlert[]> {
        const process_alert = this.repository.find();
        return process_alert;
    }

    async save(process: IProcessAlertDTO): Promise<ProcessAlert> {
        const process_alert = this.repository.save(process);
        return process_alert;
    }

    async create(newProcessAlert : IProcessAlertDTO[]): Promise<void> {
        const createprocess_alert = this.repository.create(newProcessAlert)
        const criado = await this.repository.save(createprocess_alert);      
    }
}

export {ProcessAlertRepository};