import { injectable, inject } from "tsyringe";
import { Criterions } from "../../../entities/Criterions";
import { Instruments } from "../../../entities/Instruments";
import { ICriterionRepository } from "../../../repositories/Criterion/ICriterionRepository";
import { IInstrumentRepository } from "../../../repositories/Instrument/IInstrumentRepository";

interface IRequest {
  id_instrument?: number;
  docNum: number;
  description: string;
  note? : string;
  status?: string;
  frequency?: string;
  localization?: string;
  responsible?: string;
  acquisition?: string;
  itemCodePurchase?: string;
  itemCodeService?: string;
  inactive?: string;
  criterions?: Criterions[];
}

interface IResponse {
  instrument: Instruments,
  criterion?: Criterions[]
}

@injectable()
class UpdateInstrumentUseCase {
  constructor(
    @inject("InstrumentRepository")
    private instrumentRepository: IInstrumentRepository,
    @inject("CriterionRepository")
    private criterionRepository: ICriterionRepository){}

  async execute({
    id_instrument,
    docNum,
    description,
    note,
    status,
    frequency,
    localization,
    responsible,
    acquisition,
    itemCodePurchase,
    itemCodeService,
    inactive,
    criterions
  }:IRequest): Promise<IResponse>{
    try {
      const instrumentData = await this.instrumentRepository.findOne({where: {id_instrument: id_instrument}});
      const instrument = await this.instrumentRepository.save({
        ...instrumentData,
        id_instrument,
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
        inactive,
      });
      try {
        await this.criterionRepository.deleteCriterion(id_instrument);
        try {
          if(criterions && criterions.length > 0 ){
            let arrayCriterions = [];
            criterions.map( eachCriterion => {
              arrayCriterions.push({
                typeCriterion_id: eachCriterion.typeCriterion_id,
                typeResolution_id: eachCriterion.typeResolution_id,
                typeRangeUse_id: eachCriterion.typeRangeUse_id,
                id_instrument : instrument.id_instrument,
              });
            });
            if(arrayCriterions.length > 0){
              try{
                const criterionResponse = await this.criterionRepository.create(arrayCriterions);
                return({criterion: criterionResponse, instrument})
              } catch (error) {
                console.log(error)
              }
            }
          }
          return({instrument})
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export {UpdateInstrumentUseCase}
