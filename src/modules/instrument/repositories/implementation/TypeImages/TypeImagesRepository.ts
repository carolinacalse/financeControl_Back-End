import { TypeImages } from "../../../entities/TypeImages";
import { getRepository, Repository,  } from "typeorm";
import { ICreateTypeImagesDTO, ITypeImagesRepository } from "../../TypeImages/ITypeImagesRepository";

class TypeImagesRepository implements ITypeImagesRepository {
  private repository : Repository<TypeImages>;
  constructor() {
  this.repository = getRepository(TypeImages);
  }

  async create(images : ICreateTypeImagesDTO): Promise<TypeImages> {
   const typeImages = this.repository.create(images);
   const response =  await this.repository.save(typeImages);

   return response;
  }


  async findOne({ where: { typeImages_id } }: { where: { typeImages_id: any; }; }): Promise<TypeImages> {
    const typeImages = await this.repository.findOne({ where: { typeImages_id } })
    return typeImages;
}

async save(typeImage: ICreateTypeImagesDTO): Promise<TypeImages> {
  const typeImages = await this.repository.save(typeImage);
  return typeImages;
}

async delete(typeImages_id: number): Promise<void> {
  await this.repository.delete({typeImages_id})
  return;
}


async find(): Promise<TypeImages[]> {
  const typeImages = this.repository.createQueryBuilder("img")
  .orderBy("img.typeImages_id", "DESC")
  .getRawMany()

  return typeImages;
  }

}

export {TypeImagesRepository};
