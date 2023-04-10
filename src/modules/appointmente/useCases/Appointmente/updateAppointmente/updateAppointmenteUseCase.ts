import { injectable, inject } from "tsyringe";
import { Appointments } from "../../../entities/Appointments";
import { NotConforms } from "../../../entities/NotConforms";
import { IAppointmenteRepository } from "../../../repositories/Appointmente/IAppointmenteRepository";
import { INotConformRepository } from "../../../repositories/NotConform/INotConformRepository";

interface IRequest {
  id?: number;
  docNum: number;
  status: string;
  create_user: string;
  op: string;
  nota?: string;
  bch?: string;
  feedstock ?: string;
  partNumber: string;
  client?: string;
  address?: string;
  descriptionInspection?: string;
  firstInspection?: string;
  quantityTotal?: number;
  quantityApproved?: number;
  quantityRejected?: number;
  provider?: string;
  inactive?: string;
}

interface IResponse {
  appointmente: Appointments
}

@injectable()
class UpdateAppointmenteUseCase {
  constructor(
    @inject("AppointmenteRepository")
    private appointmenteRepository: IAppointmenteRepository){}

  async execute({
    id,
    docNum,
    status,
    create_user,
    op,
    nota,
    bch,
    feedstock,
    partNumber,
    client,
    address,
    descriptionInspection,
    firstInspection,
    quantityTotal,
    quantityApproved,
    quantityRejected,
    provider,
  }:IRequest): Promise<IResponse>{
    try {
      const appointmenteData = await this.appointmenteRepository.findOne({where: {id: id}});
      const appointmente = {
        ...appointmenteData,
        id,
        docNum,
        status,
        create_user,
        op,
        nota,
        bch,
        feedstock,
        partNumber,
        client,
        address,
        descriptionInspection,
        firstInspection,
        quantityTotal,
        quantityApproved,
        quantityRejected,
        provider,
      };
      const saved = await this.appointmenteRepository.save(appointmente);
      return {appointmente};

      } catch (error) {
        console.log(error);
      }
    }
}

export {UpdateAppointmenteUseCase}
