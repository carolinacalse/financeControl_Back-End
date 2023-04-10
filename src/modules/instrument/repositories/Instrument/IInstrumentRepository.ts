import { Instruments } from "../../entities/Instruments";

interface ICreateInstrumentsDTO {
  id_instrument?: number;
  docNum: number;
  description: string;
  note : string;
  status ?: string;
  frequency ?: string;
  localization ?: string;
  responsible: string;
  acquisition?: string;
  itemCodePurchase?: string;
  inactive?: string;
  itemCodeService?: string;

}

interface IInstrumentRepository {
  findByName(id_instrument: number): Promise<Instruments>;
  save(instrument : ICreateInstrumentsDTO): Promise<Instruments>;
  findOne({ where: { id_instrument } }: { where: { id_instrument: any } }): Promise<Instruments>;
  list(): Promise<Instruments[]>;
  create({
    docNum,
    description,
    note ,
    status ,
    frequency ,
    localization ,
    responsible,
    acquisition,
    itemCodePurchase,
    itemCodeService,}: ICreateInstrumentsDTO) : Promise<Instruments>;

}
export {IInstrumentRepository, ICreateInstrumentsDTO};

