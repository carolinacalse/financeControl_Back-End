import { injectable, inject } from "tsyringe";
import { ClassificationDefects } from "../../../entities/ClassificationDefects";
import { IClassificationDefectRepository } from "../../../repositories/ClassificationDefect/IClassificationDefectRepository";

interface IRequest {
  classificationDefect_id:number;
  docNum: number;
  description: string;
  level: string;
  inactive: string;
}


@injectable()
class UpdateClassificationDefectUseCase {
  constructor(
    @inject("ClassificationDefectRepository")
    private classificationDefectRepository: IClassificationDefectRepository){}


async execute({
  classificationDefect_id,
   docNum,
   description,
   level,
   inactive
  }:IRequest): Promise<ClassificationDefects>{
  const classificationDefectData = await this.classificationDefectRepository.findOne({where: {classificationDefect_id: classificationDefect_id}});
  const classificationDefects = {
    ...classificationDefectData,
    docNum,
    description,
    level,
    inactive };
    await this.classificationDefectRepository.save(classificationDefects);
    return (classificationDefects);
}
}

export {UpdateClassificationDefectUseCase}
