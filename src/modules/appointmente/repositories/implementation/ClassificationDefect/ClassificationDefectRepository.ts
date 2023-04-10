
import { getRepository, Repository,  } from "typeorm";
import { ClassificationDefects } from "../../../entities/ClassificationDefects";
import { IClassificationDefectRepository, ICreateClassificationDefectsDTO } from "../../ClassificationDefect/IClassificationDefectRepository";

class ClassificationDefectRepository implements IClassificationDefectRepository {
  private repository : Repository<ClassificationDefects>;
  constructor() {
  this.repository = getRepository(ClassificationDefects);
  }

  async create({ classificationDefect_id,docNum, description,level}: ICreateClassificationDefectsDTO): Promise<void> {
   const classificationDefects = this.repository.create({
    classificationDefect_id,
    docNum,
    description,
    level,
   })
   await this.repository.save(classificationDefects);
  };


  async findOne({ where: { classificationDefect_id } }: { where: { classificationDefect_id: any; }; }): Promise<ClassificationDefects> {
    const classificationDefects = await this.repository.findOne({ where: { classificationDefect_id } });
    return classificationDefects;
  }

  async save(classificationDefect : ICreateClassificationDefectsDTO) : Promise<ClassificationDefects> {
    const classificationDefects = await this.repository.save(classificationDefect);
    return classificationDefects;
  }

  async list(): Promise <ClassificationDefects[]> {
    const classificationDefect = await this.repository.find();
    return classificationDefect;
   }

  async findByName(classificationDefect_id: number) : Promise<ClassificationDefects> {
  const classificationDefects = await this.repository.findOne({classificationDefect_id});
  return classificationDefects;
  };


}
export {ClassificationDefectRepository};
