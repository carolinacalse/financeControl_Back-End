import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeActionUseCase } from "./updateTypeActionUseCase";

class UpdateTypeActionController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
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
      email_adress
    } = request.body;

    try {
    const updateTypeActionController= container.resolve(UpdateTypeActionUseCase);

    const types_response = await updateTypeActionController.execute({
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
      email_adress
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeActionController};
