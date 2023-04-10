import { injectable, inject } from "tsyringe";
import { TypeImages } from "../../../entities/TypeImages";
import { ITypeImagesRepository } from "../../../repositories/TypeImages/ITypeImagesRepository";

interface IRequest {
    typeImages_id: number;
    image_name: string;
    image_url?: string;
    typeDevice_id?: number;
    typeModel_id?: number;
    typeCalibration_id?: number;
    id_instrument?: number;
    id_appointment?: number;
    id_action?: number;
}


@injectable()
class UpdateTypeImagesUseCase {
  constructor(
    @inject("TypeImagesRepository")
    private typeImagesRepository: ITypeImagesRepository){}


async execute({
    typeImages_id,
    image_name,
    image_url,
    typeDevice_id,
    typeModel_id,
    typeCalibration_id,
    id_instrument,
    id_appointment,
    id_action,
  }:IRequest): Promise<TypeImages>{
  const typesImagesData = await this.typeImagesRepository.findOne({where: {typeImages_id: typeImages_id}});
  const typeImages = {
    ...typesImagesData,
    image_name,
    image_url,
    typeDevice_id,
    typeModel_id,
    typeCalibration_id,
    id_instrument,
    id_appointment,
    id_action,};
    await this.typeImagesRepository.save(typeImages);
    return (typeImages);
}
}

export {UpdateTypeImagesUseCase}
