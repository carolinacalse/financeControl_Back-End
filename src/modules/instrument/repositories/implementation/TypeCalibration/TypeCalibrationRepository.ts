
import { getRepository, Repository,  } from "typeorm";
import { TypeCalibrations } from "../../../entities/TypeCalibration";
import { ITypeCalibrationRepository, ICreateTypeCalibrationsDTO  } from "../../TypeCalibration/ITypeCalibrationRepository";

class TypeCalibrationRepository implements ITypeCalibrationRepository {
  private repository : Repository<TypeCalibrations>;
  constructor() {
  this.repository = getRepository(TypeCalibrations);
  }

  async remove(typeCalibration: TypeCalibrations): Promise<void> {
    await this.repository.remove(typeCalibration);
  }

  async create({ typeCalibration_id, docNum, dateCalibration,
    nextCalibration,
    finalReport,
    type,
    item,
    provider,
    note,
    status,
    id_model,
    id_instrument,
    id_device,
    inactive, }: ICreateTypeCalibrationsDTO): Promise<TypeCalibrations> {
   const typeCalibrations = this.repository.create({
    typeCalibration_id,
    docNum,
    dateCalibration,
    nextCalibration,
    finalReport,
    type,
    item,
    provider,
    note,
    status,
    id_model,
    id_instrument,
    id_device,
    inactive,
   })
   const responseCreate = await this.repository.save(typeCalibrations);
   return responseCreate;
  }


  async findOne({ where: { typeCalibration_id } }: { where: { typeCalibration_id: any; }; }): Promise<TypeCalibrations> {
    const typeCalibrations = await this.repository.findOne({ where: { typeCalibration_id } });
    return typeCalibrations;
  }

  async save(typeCalibration : ICreateTypeCalibrationsDTO) : Promise<TypeCalibrations> {
    const typeCalibrations = await this.repository.save(typeCalibration);
    return typeCalibrations;
  }

  async list(): Promise <TypeCalibrations[]> {
    const typeCalibration = await this.repository.find();
    return typeCalibration;
   }

  async findByName(typeCalibration_id: number) : Promise<TypeCalibrations> {
  const typeCalibrations = await this.repository.findOne({typeCalibration_id});
  return typeCalibrations;
  }

}
export {TypeCalibrationRepository};
