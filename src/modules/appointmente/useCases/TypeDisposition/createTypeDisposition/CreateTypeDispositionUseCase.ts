import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../errors/AppError";
import { TypeDispositions } from "../../../entities/TypeDisposition";
import { ITypeDispositionRepository } from "../../../repositories/TypeDisposition/ITypeDispositionRepository";

interface IRequest{
  typeDisposition_id?: number;
  docNum: number;
  description: string;
}


@injectable()
class CreateTypeDispositionUseCase {
  constructor(
    @inject("TypeDispositionRepository")
    private typeDispositionRepository: ITypeDispositionRepository) {}

  async execute({typeDisposition_id, docNum, description}: IRequest) : Promise<void> {

    const typeDispositionsAlreadyExists = await this.typeDispositionRepository.findByName(typeDisposition_id);

    if (typeDispositionsAlreadyExists) {
      throw new AppError("TypeDisposition already exists! ");
    }
    await this.typeDispositionRepository.create({
      docNum,
      description,
    });

  }
}

export {CreateTypeDispositionUseCase};
