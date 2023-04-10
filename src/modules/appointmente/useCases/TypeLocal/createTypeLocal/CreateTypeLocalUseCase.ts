import { inject, injectable } from "tsyringe";
import { ITypeLocalRepository } from "../../../repositories/TypeLocal/ITypeLocalRepository";

interface IRequest{
  typeLocal_id?: number;
  docNum: number;
  group: string;
  subgroup: string;
  type: string;
}


@injectable()
class CreateTypeLocalUseCase {
  constructor(
    @inject("TypeLocalRepository")
    private typeLocalRepository: ITypeLocalRepository) {}

  async execute({docNum, group, subgroup, type}: IRequest) : Promise<void> {

    await this.typeLocalRepository.create({
      docNum,
      group,
      subgroup,
      type,
    });

  }
}

export {CreateTypeLocalUseCase};
