import { ClassificationDefects } from "../../entities/ClassificationDefects";

interface ICreateClassificationDefectsDTO {
  classificationDefect_id?: number;
  docNum: number;
  description: string;
  level: string;
}

interface IClassificationDefectRepository {
  findByName(classificationDefect_id: number): Promise<ClassificationDefects>;
  findOne({ where: { classificationDefect_id } }: { where: { classificationDefect_id: any } }): Promise<ClassificationDefects>;
  list(): Promise<ClassificationDefects[]>;
  save(classificationDefect : ICreateClassificationDefectsDTO): Promise<ClassificationDefects>;
  create ({docNum, description, level }: ICreateClassificationDefectsDTO) : Promise<void>;

}
export {IClassificationDefectRepository, ICreateClassificationDefectsDTO};
