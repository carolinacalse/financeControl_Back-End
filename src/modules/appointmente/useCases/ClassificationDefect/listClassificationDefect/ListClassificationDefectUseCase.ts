import { injectable, inject } from "tsyringe";
import { ClassificationDefects } from "../../../entities/ClassificationDefects";
import { IClassificationDefectRepository } from "../../../repositories/ClassificationDefect/IClassificationDefectRepository";

@injectable()
class ListClassificationDefectUseCase {
  constructor(
    @inject("ClassificationDefectRepository")
    private classificationDefectRepository: IClassificationDefectRepository){}

  async execute() : Promise<ClassificationDefects[]>{
    const classificationDefect = await this.classificationDefectRepository.list();

    return classificationDefect;
  }
}
export {ListClassificationDefectUseCase}
