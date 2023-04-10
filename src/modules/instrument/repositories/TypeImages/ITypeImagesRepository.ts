import { TypeImages } from "../../entities/TypeImages";

interface ICreateTypeImagesDTO {
    typeImages_id?: number;
    image_name?: string;
    image_url?: string;
    typeDevice_id?: number;
    typeCriterion_id?: number;
    typeCalibration_id?: number;
    id_instrument?: number;
    id_appointment?: number;
    typeModel_id?: number;
    typealert_id?: number;
    id_action?: number;
    selected?: string;
    cancel?: string;
}

interface ITypeImagesRepository {
  create(images: ICreateTypeImagesDTO): Promise<TypeImages>
  find(): Promise<TypeImages[]>
  findOne({ where: {typeImages_id} }): Promise <TypeImages>
  save(imgRep: ICreateTypeImagesDTO): Promise <TypeImages>
  delete(typeImages_id: number): Promise<void>
}
export {ITypeImagesRepository, ICreateTypeImagesDTO};

