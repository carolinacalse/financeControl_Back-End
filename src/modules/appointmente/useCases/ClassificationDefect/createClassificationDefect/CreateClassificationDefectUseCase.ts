import { inject, injectable } from "tsyringe";
import { IClassificationDefectRepository } from "../../../repositories/ClassificationDefect/IClassificationDefectRepository";

interface IRequest{
  docNum: number;
  description: string;
  level: string;
}


@injectable()
class CreateClassificationDefectUseCase {
  constructor(
    @inject("ClassificationDefectRepository")
    private classificationDefectRepository: IClassificationDefectRepository) {}

  async execute({docNum, description,level}: IRequest) : Promise<void> {

    await this.classificationDefectRepository.create({
      docNum,
      description,
      level,
    });

  }
}

export {CreateClassificationDefectUseCase};
