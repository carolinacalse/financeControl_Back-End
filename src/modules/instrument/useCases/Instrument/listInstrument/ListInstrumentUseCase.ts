import { injectable, inject } from "tsyringe";
import { Instruments } from "../../../entities/Instruments";
import { IInstrumentRepository } from "../../../repositories/Instrument/IInstrumentRepository";

@injectable()
class ListInstrumentUseCase {
  constructor(
    @inject("InstrumentRepository")
    private instrumentRepository: IInstrumentRepository){}

  async execute() : Promise<Instruments[]>{
    const instrument = await this.instrumentRepository.list();

    return instrument;
  }
}
export {ListInstrumentUseCase}
