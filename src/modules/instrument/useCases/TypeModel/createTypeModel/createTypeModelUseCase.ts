import { inject, injectable } from "tsyringe";
import { ITypeDeviceOrModelRepository } from "../../../repositories/TypeDeviceOrModel/ITypeDeviceOrModelRepository";
import { ITypeModelRepository } from "../../../repositories/TypeModel/ITypeModelRepository";

interface IRequest{
  docNum: number;
  developed: string;
  location: string;
  frequency: string;
  responsible: string;
  customer: string;
  status: string;
  positionID: number;
  positionDescription: string;
  partNumber: [
    {
      typeDeviceOrModel_id: number,
      model_id: number,
      ItemCode: string
    }
  ];
}

@injectable()
class CreateTypeModelUseCase {
  constructor(
    @inject("TypeModelRepository")
    private typeModelRepository: ITypeModelRepository,
    @inject("TypeDeviceOrModelRepository")
    private typeDeviceOrModelRepository: ITypeDeviceOrModelRepository,
  ){}

  async execute({ docNum, developed, frequency, location, responsible, customer, status, positionID, positionDescription,partNumber
  }: IRequest) : Promise<void> {

    try {
      const model = await this.typeModelRepository.create({
        docNum,
        developed,
        location,
        frequency,
        responsible,
        customer,
        status,
        positionID,
        positionDescription,
      });
      if(partNumber && partNumber.length > 0 ){
        let arrayPartNumbers = [];
        partNumber.map( eachPartNumber => {
          arrayPartNumbers.push({
            item: eachPartNumber.ItemCode,
            model_id : model.typeModel_id,
          });
        });
        if(arrayPartNumbers.length > 0){
          try{
            await this.typeDeviceOrModelRepository.create(arrayPartNumbers);

          } catch (error) {
            console.log(error)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export {CreateTypeModelUseCase};
