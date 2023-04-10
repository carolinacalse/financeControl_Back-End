
import { getRepository, Repository,  } from "typeorm";
import { TypeActions } from "../../../entities/TypeAction";
import { ITypeActionRepository, ICreateTypeActionsDTO  } from "../../TypeAction/ITypeActionRepository";

class TypeActionRepository implements ITypeActionRepository {
  private repository : Repository<TypeActions>;
  constructor() {
  this.repository = getRepository(TypeActions);
  }

  async create({ typeAction_id, docNum, description, follow, type, responsible, deadline, status, action, comments, localization, id_rnc, externalAction, action_origin, email_adress}: ICreateTypeActionsDTO): Promise<TypeActions> {
    const typeActions = this.repository.create({
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
    })
    const envio = await this.repository.save(typeActions);
    return envio;
  }


  async findOne({ where: { typeAction_id } }: { where: { typeAction_id: any; }; }): Promise<TypeActions> {
    const typeActions = await this.repository.findOne({ where: { typeAction_id } });
    return typeActions;
  }

  async save(typeAction : ICreateTypeActionsDTO) : Promise<TypeActions> {
    const typeActions = await this.repository.save(typeAction);
    return typeActions;
  }

  async list(): Promise <TypeActions[]> {
    const typeAction = await this.repository.find();
    return typeAction;
  }

  async findByName(typeAction_id: number) : Promise<TypeActions> {
    const typeActions = await this.repository.findOne({typeAction_id});
    return typeActions;
  };

}

export {TypeActionRepository};
