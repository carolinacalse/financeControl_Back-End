import { injectable, inject } from "tsyringe";
import { TypeImages } from "../../../entities/TypeImages";
import { ITypeImagesRepository } from "../../../repositories/TypeImages/ITypeImagesRepository";

@injectable()
class ListTypeImagesUseCase {
  constructor(
    @inject("TypeImagesRepository")
    private typeImagesRepository: ITypeImagesRepository){}

  async execute() : Promise<TypeImages[]>{
    const typeImages = await this.typeImagesRepository.find();

    return typeImages;
  }
}
export {ListTypeImagesUseCase}
