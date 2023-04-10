import { inject, injectable } from "tsyringe";
import { ITypeFrequencyRepository } from "../../../repositories/TypeFrequency/ITypeFrequencyRepository";

interface IRequest{
  typeFrequency_id?: number;
  docNum: number;
  description: string;
}


@injectable()
class CreateTypeFrequencyUseCase {
  constructor(
    @inject("TypeFrequencyRepository")
    private typeFrequencyRepository: ITypeFrequencyRepository) {}

  async execute({docNum, description}: IRequest) : Promise<void> {

    await this.typeFrequencyRepository.create({
      docNum,
      description,
    });

  }
}

export {CreateTypeFrequencyUseCase};
