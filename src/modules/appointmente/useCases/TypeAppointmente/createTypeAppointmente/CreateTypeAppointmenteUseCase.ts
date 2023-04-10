import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../errors/AppError";
import { ITypeAppointmenteRepository } from "../../../repositories/TypeAppointmente/ITypeAppointmenteRepository";

interface IRequest{
  typeAppointmente_id?: number;
  docNum: number;
  description: string;
}


@injectable()
class CreateTypeAppointmenteUseCase {
  constructor(
    @inject("TypeAppointmenteRepository")
    private typeAppointmenteRepository: ITypeAppointmenteRepository) {}

  async execute({typeAppointmente_id, docNum, description}: IRequest) : Promise<void> {

    const typeAppointmentesAlreadyExists = await this.typeAppointmenteRepository.findByName(typeAppointmente_id);

    if (typeAppointmentesAlreadyExists) {
      throw new AppError("TypeAppointmente already exists! ");
    }
    await this.typeAppointmenteRepository.create({
      docNum,
      description,
    });

  }
}

export {CreateTypeAppointmenteUseCase};
