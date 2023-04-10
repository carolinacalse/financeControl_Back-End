import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../errors/AppError";
import { TypeDefects } from "../../../entities/TypeDefects";
import { ITypeDefectRepository } from "../../../repositories/TypeDefect/ITypeDefectRepository";

interface IRequest{
  typeDefect_id?: number;
  docNum: number;
  description: string;
}


@injectable()
class CreateTypeDefectUseCase {
  constructor(
    @inject("TypeDefectRepository")
    private typeDefectRepository: ITypeDefectRepository) {}

  async execute({typeDefect_id, docNum, description}: IRequest) : Promise<void> {

    const typeDefectsAlreadyExists = await this.typeDefectRepository.findByName(typeDefect_id);

    if (typeDefectsAlreadyExists) {
      throw new AppError("TypeDefect already exists! ");
    }
    await this.typeDefectRepository.create({
      docNum,
      description,
    });

  }
}

export {CreateTypeDefectUseCase};
