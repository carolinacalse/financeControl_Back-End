import { inject, injectable } from "tsyringe";
import { ITypeResolutionRepository } from "../../../repositories/TypeResolution/ITypeResolutionRepository";

interface IRequest{
  typeResolution_id?: number;
  docNum: number;
  description: string;
}


@injectable()
class CreateTypeResolutionUseCase {
  constructor(
    @inject("TypeResolutionRepository")
    private typeResolutionRepository: ITypeResolutionRepository) {}

  async execute({ docNum, description}: IRequest) : Promise<void> {

    await this.typeResolutionRepository.create({
      docNum,
      description,
    });

  }
}

export {CreateTypeResolutionUseCase};
