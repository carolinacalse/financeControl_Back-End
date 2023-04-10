import { getRepository, Repository,  } from "typeorm";
import { Appointments } from "../../../entities/Appointments";
import { NotConforms } from "../../../entities/NotConforms";
import { IAppointmenteRepository, ICreateAppointmentsDTO } from "../../Appointmente/IAppointmenteRepository";

class AppointmenteRepository implements IAppointmenteRepository {
  private repository: Repository<Appointments>;
  constructor() {
    this.repository = getRepository(Appointments);
  }

  async create ({
    /* id, */
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
    inactive,} : ICreateAppointmentsDTO) : Promise<Appointments> {
      const appointments = this.repository.create({
        /* id, */
        docNum,
        status,
        create_user,
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
      })
    const responseCreate = await this.repository.save(appointments);
    return responseCreate;
  }
 async list(): Promise <Appointments[]> {
   const appointmente = await this.repository.createQueryBuilder("ap")
   .select(["ap.id","ap.docNum", "ap.op","ap.created_at","ap.status","ap.partNumber","ap.address","ap.quantityApproved","ap.quantityRejected","nc.notConform_id"])
   .leftJoin(NotConforms,"nc","nc.appointmente_id = ap.id")
   .orderBy("nc.notConform_id", "DESC")
   .where("ap.cancel = 'N'")
   .getRawMany();
   return appointmente;
  }
 async findByName(id: number) : Promise<Appointments> {
    const appointments = await this.repository.findOne({id});
    return appointments;
  }
  async findOne({ where: { id } }: { where: { id: any; }; }): Promise<Appointments> {
    const appointments = await this.repository.findOne({ where: { id } });
    return appointments;
  }

  async save(appointmente : ICreateAppointmentsDTO) : Promise<Appointments> {
    const appointments = await this.repository.save(appointmente);
    return appointments;
  }
}

export {AppointmenteRepository};
