import { inject, injectable } from "tsyringe";
import { ITypeDeviceRepository } from "../../../repositories/TypeDevice/ITypeDeviceRepository";
import { ITypeDeviceOrModelRepository } from "../../../repositories/TypeDeviceOrModel/ITypeDeviceOrModelRepository";

interface IRequest{
  docNum: number;
  developed: string;
  location: string;
  frequency: string;
  responsible: string;
  customer: string;
  status: string;
  criterion: string;
  note: string;
  positionID: number;
  positionDescription: string;
  partNumber: [
    {
      typeDeviceOrModel_id: number,
      device_id: number,
      ItemCode: string
    }
  ];
}

@injectable()
class CreateTypeDeviceUseCase {
  constructor(
    @inject("TypeDeviceRepository")
    private typeDeviceRepository: ITypeDeviceRepository,
    @inject("TypeDeviceOrModelRepository")
    private typeDeviceOrModelRepository: ITypeDeviceOrModelRepository,
  ){}


  async execute({docNum, developed, frequency, location, responsible, customer, status, partNumber, criterion, note, positionID, positionDescription,}: IRequest) : Promise<void> {

    try {
      const device = await this.typeDeviceRepository.create({
        docNum,
        developed,
        location,
        frequency,
        responsible,
        customer,
        status,
        criterion,
        note,
        positionID,
        positionDescription,
      });
      if(partNumber && partNumber.length > 0 ){
        let arrayPartNumbers = [];
        partNumber.map( eachPartNumber => {
          arrayPartNumbers.push({
            item: eachPartNumber.ItemCode,
            device_id : device.typeDevice_id,
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

export {CreateTypeDeviceUseCase};
