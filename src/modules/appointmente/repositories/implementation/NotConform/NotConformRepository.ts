import { getRepository, Repository,  } from "typeorm";
import { NotConforms } from "../../../entities/NotConforms";
import { INotConformRepository, ICreateNotConformsDTO } from "../../NotConform/INotConformRepository";

class NotConformRepository implements INotConformRepository {
  private repository: Repository<NotConforms>;
  constructor() {
    this.repository = getRepository(NotConforms);
  }

  async create (notConform : ICreateNotConformsDTO) : Promise<NotConforms> {
    const notConforms = this.repository.create(notConform)

  const responseNotConform= await this.repository.save(notConforms);
  return responseNotConform;
}

 async list(): Promise <NotConforms[]> {
   const notConform = await this.repository.find();
   return notConform;
  }
 async findByName(notConform_id: number) : Promise<NotConforms> {
    const notConforms = await this.repository.findOne({notConform_id});
    return notConforms;
  }
  async findOne({ where: { notConform_id } }: { where: { notConform_id: any; }; }): Promise<NotConforms> {
    const notConforms = await this.repository.findOne({ where: { notConform_id } });
    return notConforms;
  }

  async save(notConform : ICreateNotConformsDTO) : Promise<NotConforms> {
    const notConforms = await this.repository.save(notConform);
    return notConforms;
  }


}


export {NotConformRepository};
