import { inject, injectable } from "tsyringe";
import { TypeImages } from "../../../entities/TypeImages";
import { ITypeImagesRepository } from "../../../repositories/TypeImages/ITypeImagesRepository";

interface IRequest{
  image_name?: string;
  image_url?: string;
  typeDevice_id?: number;
  typeModel_id?: number;
  typeCalibration_id?: number;
  id_appointment?: number;
  id_instrument?: number;
  typealert_id?: number;
  id_action?: number;
  selected?: string;
}

@injectable()
class CreateTypeImagesUseCase {
  constructor(
    @inject("TypeImagesRepository")
    private typeImagesRepository: ITypeImagesRepository) {}

  async execute({
    image_name,
    image_url,
    selected,
    typeDevice_id,
    typeModel_id,
    typeCalibration_id,
    id_instrument,
    id_appointment,
    typealert_id,
    id_action
  }: IRequest) : Promise<TypeImages> {

    const upload = await this.typeImagesRepository.create({
      image_name,
      image_url,
      selected: 'N',
      typeDevice_id: typeDevice_id ? Number(typeDevice_id): null,
      typeModel_id: typeModel_id ? Number(typeModel_id): null,
      typeCalibration_id: typeCalibration_id ? Number(typeCalibration_id): null,
      id_instrument: id_instrument ? Number(id_instrument): null,
      id_appointment: id_appointment? Number(id_appointment): null,
      typealert_id: typealert_id ? Number(typealert_id) : null,
      id_action : id_action ? Number(id_action) : null,
    });
    return upload;
  }
}

export {CreateTypeImagesUseCase};
