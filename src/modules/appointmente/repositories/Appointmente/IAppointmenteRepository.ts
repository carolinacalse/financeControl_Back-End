import { Appointments } from "../../entities/Appointments";

interface ICreateAppointmentsDTO {
  id?: number;
  docNum: number;
  status: string;
  op : string;
  nota ?: string;
  bch ?: string;
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
  create_user: string;
}

interface IAppointmenteRepository {
  findByName(id: number): Promise<Appointments>;
  save(appointmente : ICreateAppointmentsDTO): Promise<Appointments>;
  findOne({ where: { id } }: { where: { id: any } }): Promise<Appointments>;
  list(): Promise<Appointments[]>;
  create({
    docNum,
    status,
    op ,
    nota ,
    bch ,
    feedstock ,
    partNumber,
    client,
    address,
    descriptionInspection,
    firstInspection,
    quantityTotal,
    quantityApproved,
    quantityRejected,
    provider,
    inactive,
    create_user
  }: ICreateAppointmentsDTO) : Promise<Appointments>;

}
export {IAppointmenteRepository, ICreateAppointmentsDTO};

