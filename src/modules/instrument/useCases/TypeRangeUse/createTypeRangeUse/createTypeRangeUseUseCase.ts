import { inject, injectable } from "tsyringe";
import { ITypeRangeUseRepository } from "../../../repositories/TypeRangeUse/ITypeRangeUseRepository";

interface IRequest{
  docNum: number;
  minimum: string;
  maximum: string;
}


@injectable()
class CreateTypeRangeUseUseCase {
  constructor(
    @inject("TypeRangeUseRepository")
    private typeRangeUseRepository: ITypeRangeUseRepository) {}

  async execute({docNum, minimum, maximum}: IRequest) : Promise<void> {

    await this.typeRangeUseRepository.create({
      docNum,
      minimum,
      maximum,
    });
  }
}

export {CreateTypeRangeUseUseCase};
