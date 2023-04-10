
import { getRepository, Repository,  } from "typeorm";
import { TypeDispositions } from "../../../entities/TypeDisposition";
import { ITypeDispositionRepository, ICreateTypeDispositionsDTO  } from "../../TypeDisposition/ITypeDispositionRepository";

class TypeDispositionRepository implements ITypeDispositionRepository {
  private repository : Repository<TypeDispositions>;
  constructor() {
  this.repository = getRepository(TypeDispositions);
  }

  async create({ typeDisposition_id,docNum, description}: ICreateTypeDispositionsDTO): Promise<void> {
   const typeDispositions = this.repository.create({
    typeDisposition_id,
    docNum,
    description,
   })
   await this.repository.save(typeDispositions);
  };


  async findOne({ where: { typeDisposition_id } }: { where: { typeDisposition_id: any; }; }): Promise<TypeDispositions> {
    const typeDispositions = await this.repository.findOne({ where: { typeDisposition_id } });
    return typeDispositions;
  }

  async save(typeDisposition : ICreateTypeDispositionsDTO) : Promise<TypeDispositions> {
    const typeDispositions = await this.repository.save(typeDisposition);
    return typeDispositions;
  }

  async list(): Promise <TypeDispositions[]> {
    const typeDisposition = await this.repository.find();
    return typeDisposition;
   }

  async findByName(typeDisposition_id: number) : Promise<TypeDispositions> {
  const typeDispositions = await this.repository.findOne({typeDisposition_id});
  return typeDispositions;
  };

 /*  async update(typeDisposition_id: number) : Promise<TypeDispositions> {
    const typeDispositions = await this.repository.findOne({typeDisposition_id});
    return typeDispositions;
    }; */

}
export {TypeDispositionRepository};
