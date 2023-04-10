import { injectable, inject } from "tsyringe";
import { Appointments } from "../../../entities/Appointments";
import { IAppointmenteRepository } from "../../../repositories/Appointmente/IAppointmenteRepository";

@injectable()
class ListAppointmenteUseCase {
  constructor(
    @inject("AppointmenteRepository")
    private appointmenteRepository: IAppointmenteRepository){}

   async execute() : Promise<Appointments[]>{
    const appointmente = await this.appointmenteRepository.list();

    return appointmente;
  }
}
export {ListAppointmenteUseCase}
