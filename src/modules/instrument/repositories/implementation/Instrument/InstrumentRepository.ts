import { getRepository, Repository,  } from "typeorm";
import { Instruments } from "../../../entities/Instruments";
import { ICreateInstrumentsDTO, IInstrumentRepository } from "../../Instrument/IInstrumentRepository";

class InstrumentRepository implements IInstrumentRepository {
  private repository: Repository<Instruments>;
  constructor() {
    this.repository = getRepository(Instruments);
  }
  async create ({
    docNum,
    description,
    note ,
    status ,
    frequency ,
    localization ,
    responsible,
    acquisition,
    itemCodePurchase,
    itemCodeService,} : ICreateInstrumentsDTO) : Promise<Instruments> {
        const instruments = this.repository.create({
          docNum,
          description,
          note ,
          status ,
          frequency ,
          localization ,
          responsible,
          acquisition,
          itemCodePurchase,
          itemCodeService,
        })
        const responseCreate = await this.repository.save(instruments);

        return responseCreate;
      }

 async list(): Promise <Instruments[]> {
  const instrument = await this.repository.find();
  return instrument;
 }

 async findByName(id_instrument: number) : Promise<Instruments> {
    const instruments = await this.repository.findOne({id_instrument});
    return instruments;
  }
  async findOne({ where: { id_instrument } }: { where: { id_instrument: any; }; }): Promise<Instruments> {
    const instruments = await this.repository.findOne({ where: { id_instrument } });
    return instruments;
  }

  async save(instrument : ICreateInstrumentsDTO) : Promise<Instruments> {
    const instruments = await this.repository.save(instrument);
    return instruments;
  }
}

export {InstrumentRepository};
