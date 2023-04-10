import { inject, injectable } from "tsyringe";
import { TypeActions } from "../../../entities/TypeAction";
import { ITypeActionRepository } from "../../../repositories/TypeAction/ITypeActionRepository";

interface IRequest{
  docNum: number;
  description: string;
  follow: string;
  type: string;
  responsible: string;
  deadline: string;
  status: string;
  action: string;
  comments: string;
  localization: string;
  id_rnc: number;
  externalAction: string;
  action_origin: string;
  email_adress: string;
}


@injectable()
class CreateTypeActionUseCase {
  constructor(
    @inject("TypeActionRepository")
    private typeActionRepository: ITypeActionRepository) {}

  async execute({
    docNum,
    description,
    follow,
    type,
    responsible,
    deadline,
    status,
    comments,
    localization,
    id_rnc,
    action,
    externalAction,
    action_origin,
    email_adress,
  }: IRequest) : Promise<TypeActions> {
    try {
      const create_action = await this.typeActionRepository.create({
        docNum,
        description,
        follow,
        type,
        responsible,
        deadline,
        status,
        comments,
        localization,
        id_rnc,
        action,
        externalAction,
        action_origin,
        email_adress,
      });
      return (create_action);

    } catch (error) {
      console.log(error)
    }
  }
}

export {CreateTypeActionUseCase};
