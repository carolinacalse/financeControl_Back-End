import { TypeAppointmente } from "../../../entities/TypeAppointmente";
import { getRepository, Repository,  } from "typeorm";
import { ITypeAppointmenteRepository, ICreateTypeAppointmenteDTO  } from "../../TypeAppointmente/ITypeAppointmenteRepository";

class TypeAppointmenteRepository implements ITypeAppointmenteRepository {
  private repository : Repository<TypeAppointmente>;
  constructor() {
  this.repository = getRepository(TypeAppointmente);
  }

  async create({ typeAppointmente_id,docNum, description}: ICreateTypeAppointmenteDTO): Promise<void> {
   const typeAppointmente = this.repository.create({
    typeAppointmente_id,
    docNum,
    description,
   })
   await this.repository.save(typeAppointmente);
  }


  async findOne({ where: { typeAppointmente_id } }: { where: { typeAppointmente_id: any; }; }): Promise<TypeAppointmente> {
    const typeAppointmente = await this.repository.findOne({ where: { typeAppointmente_id } });
    return typeAppointmente;
  }

  async save(typeAppointmente : ICreateTypeAppointmenteDTO) : Promise<TypeAppointmente> {
    const appointmente = await this.repository.save(typeAppointmente);
    return appointmente;
  }

  async list(): Promise <TypeAppointmente[]> {
    const typeAppointmente = await this.repository.find();
    return typeAppointmente;
   }

  async findByName(typeAppointmente_id: number) : Promise<TypeAppointmente> {
  const typeAppointmente = await this.repository.findOne({typeAppointmente_id});
  return typeAppointmente;
  }

}
export {TypeAppointmenteRepository};
