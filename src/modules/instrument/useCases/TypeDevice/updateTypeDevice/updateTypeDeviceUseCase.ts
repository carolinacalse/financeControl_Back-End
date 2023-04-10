import { injectable, inject } from "tsyringe";
import { TypeDevices } from "../../../entities/TypeDevice";
import { ITypeDeviceRepository } from "../../../repositories/TypeDevice/ITypeDeviceRepository";
import { ICreateTypeDeviceOrModelsDTO, ITypeDeviceOrModelRepository } from "../../../repositories/TypeDeviceOrModel/ITypeDeviceOrModelRepository";

interface IRequest {
  typeDevice_id: number;
  docNum: number;
  developed: string;
  location: string;
  frequency: string;
  responsible: string;
  customer: string;
  status: string;
  criterion: string;
  note: string;
  inactive: string;
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
class UpdateTypeDeviceUseCase {
  constructor(
    @inject("TypeDeviceRepository")
    private typeDeviceRepository: ITypeDeviceRepository,
    @inject("TypeDeviceOrModelRepository")
    private typeDeviceOrModelRepository: ITypeDeviceOrModelRepository){}


async execute({
  typeDevice_id,
  docNum,
  developed,
  location,
  responsible,
  frequency,
  customer,
  status,
  partNumber,
  criterion,
  note,
  inactive,
  positionID,
  positionDescription
  }:IRequest): Promise<TypeDevices>{

  try {
  const typesDeviceData = await this.typeDeviceRepository.findOne({where: {typeDevice_id: typeDevice_id}});
  const typeDevices = await this.typeDeviceRepository.save({
    ...typesDeviceData,
      docNum,
      developed,
      location,
      responsible,
      frequency,
      customer,
      status,
      criterion,
      note,
      inactive,
      positionID,
      positionDescription
    })
    try {
      await this.typeDeviceOrModelRepository.deleteDevice(typeDevice_id);
      try {
        if(partNumber){
          const newPartNumber : ICreateTypeDeviceOrModelsDTO[] = [];
          for(let index = 0; index < partNumber.length; index+=1 ){
              newPartNumber.push({
                  item: partNumber[index].ItemCode,
                  device_id: typeDevices.typeDevice_id
              })
          }
          if( newPartNumber.length > 0){
            await this.typeDeviceOrModelRepository.save(newPartNumber);
          }
        }
        return;
      } catch (error) {
          console.log(error)
      }
  } catch (error) {
      throw new Error('create partNumber repository' + error);
  }
} catch (error) {
  console.log(error)
}
}
}

export {UpdateTypeDeviceUseCase}
