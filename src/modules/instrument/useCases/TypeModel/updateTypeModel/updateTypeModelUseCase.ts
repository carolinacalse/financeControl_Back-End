import { injectable, inject } from "tsyringe";
import { TypeModels} from "../../../entities/TypeModel";
import { ITypeDeviceOrModelRepository } from "../../../repositories/TypeDeviceOrModel/ITypeDeviceOrModelRepository";
import { ITypeModelRepository } from "../../../repositories/TypeModel/ITypeModelRepository";

interface IRequest {
  typeModel_id: number;
  docNum: number;
  developed: string;
  location: string;
  frequency: string;
  responsible: string;
  customer: string;
  status: string;
  positionID: number;
  positionDescription: string;
  inactive: string;
  partNumber: [
    {
      typeDeviceOrModel_id: number,
      model_id: number,
      ItemCode: string
    }
  ];
}


@injectable()
class UpdateTypeModelUseCase {
  constructor(
    @inject("TypeDeviceOrModelRepository")
    private typeDeviceOrModelRepository: ITypeDeviceOrModelRepository,
    @inject("TypeModelRepository")
    private typeModelRepository: ITypeModelRepository){}

  async execute({
    typeModel_id,
    docNum,
    developed,
    location,
    frequency,
    responsible,
    customer,
    status,
    positionID,
    positionDescription,
    inactive,
    partNumber
    }:IRequest): Promise<TypeModels>{

  try {
    const typesModelData = await this.typeModelRepository.findOne({where: {typeModel_id: typeModel_id}});
    const typeModels = await this.typeModelRepository.save({
      ...typesModelData,
      typeModel_id,
      docNum,
      developed,
      location,
      frequency,
      responsible,
      customer,
      status,
      positionID,
      positionDescription,
      inactive
    })
      try {
        await this.typeDeviceOrModelRepository.deleteModel(typeModel_id);
        try {
          if(partNumber){
            const newPartNumber = [];
            for(let index = 0; index < partNumber.length; index+=1 ){
                newPartNumber.push({
                    item: partNumber[index].ItemCode,
                    model_id: typeModels.typeModel_id
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

export {UpdateTypeModelUseCase}
