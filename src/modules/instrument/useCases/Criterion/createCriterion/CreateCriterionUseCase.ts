import {inject, injectable} from "tsyringe"
import { Criterions } from "../../../entities/Criterions";
import { ICriterionRepository } from "../../../repositories/Criterion/ICriterionRepository";


interface IRequest {
  criterions?: [
    {
      criterion_id?: number;
      typeCriterion_id?: number;
      typeResolution_id?: number;
      typeRangeUse_id?: number;
      id_instrument?: number;
    }
  ]

}

@injectable()
class CreateCriterionUseCase {
  constructor(
    @inject("CriterionRepository")
    private criterionRepository: ICriterionRepository){}

 async execute({
      criterions
      }: IRequest) : Promise<Criterions> {

    try {
          if(criterions && criterions.length > 0 ){
            let arrayCriterions = [];
            criterions.map( eachCriterion => {
              arrayCriterions.push({
                typeCriterion_id: eachCriterion.typeCriterion_id,
                typeResolution_id: eachCriterion.typeResolution_id,
                typeRangeUse_id: eachCriterion.typeRangeUse_id,
                id_instrument : eachCriterion.id_instrument,
              });
            });

            if(arrayCriterions.length > 0){
              try{
                await this.criterionRepository.create(arrayCriterions);
                return;
              } catch (error) {
                console.log(error)
              }
            }
          }
      } catch (error) {
        console.log(error);
      }
  }
}

export {CreateCriterionUseCase};
