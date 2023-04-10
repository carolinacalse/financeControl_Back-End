import { TypeActions } from "../../entities/TypeAction";

interface ICreateTypeActionsDTO {
  typeAction_id?: number;
  docNum: number;
  description: string;
  follow: string;
  type: string;
  responsible: string;
  deadline: Date;
  status: string;
  action?: string;
  comments: string;
  localization: string;
  id_rnc?: number;
  externalAction: string;
  action_origin?: string;
  email_adress?: string;
  inactive?: string;
}

interface ITypeActionRepository {
  findByName(typeAction_id: number): Promise<TypeActions>;
  findOne({ where: { typeAction_id } }: { where: { typeAction_id: any } }): Promise<TypeActions>;
  list(): Promise<TypeActions[]>;
  save(typeAction : ICreateTypeActionsDTO): Promise<TypeActions>;
  create ({docNum, description, follow, type, responsible, deadline, status, action, comments, localization, id_rnc, externalAction, action_origin, email_adress }: ICreateTypeActionsDTO) : Promise<TypeActions>;

}
export {ITypeActionRepository, ICreateTypeActionsDTO};
