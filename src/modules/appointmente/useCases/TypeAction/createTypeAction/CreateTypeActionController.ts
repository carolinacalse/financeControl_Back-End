import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeActionUseCase } from "./CreateTypeActionUseCase";

class CreateTypeActionController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {
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

    const createTypeActionUseCase = container.resolve(CreateTypeActionUseCase);

    try {

      const send = await createTypeActionUseCase.execute({
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
      return response.status(200).json(send);
    } catch (error) {
      return response.status(200).json(error);
    }
  }
}

export {CreateTypeActionController};
