import { injectable, inject } from "tsyringe";
import { TypeActions } from "../../../entities/TypeAction";
import { ITypeActionRepository } from "../../../repositories/TypeAction/ITypeActionRepository";

interface IRequest {
  typeAction_id: number;
  docNum: number;
  description: string;
  follow: string;
  type: string;
  responsible: string;
  deadline: Date;
  status: string;
  action: string;
  comments: string;
  localization: string;
  id_rnc: number;
  externalAction: string;
  action_origin: string;
  email_adress: string;
  inactive?: string;
}


@injectable()
class UpdateTypeActionUseCase {
  constructor(
    @inject("TypeActionRepository")
    private typeActionRepository: ITypeActionRepository){}


async execute({
  typeAction_id,
  docNum,
  description,
  follow,
  type,
  responsible,
  deadline,
  status,
  action,
  comments,
  localization,
  id_rnc,
  externalAction,
  action_origin,
  email_adress,
  inactive,
  }:IRequest): Promise<TypeActions>{
    const typesActionData = await this.typeActionRepository.findOne({where: {typeAction_id: typeAction_id}});
    const typeActions = {
      ...typesActionData,
      typeAction_id,
      docNum,
      description,
      follow,
      type,
      responsible,
      deadline,
      status,
      action,
      comments,
      localization,
      id_rnc,
      externalAction,
      action_origin,
      email_adress,
      inactive,
    };
    await this.typeActionRepository.save(typeActions);
    return (typeActions);
  }
}

export {UpdateTypeActionUseCase}
