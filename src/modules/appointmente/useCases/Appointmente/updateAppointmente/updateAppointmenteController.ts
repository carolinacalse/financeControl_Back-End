import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateAppointmenteUseCase } from "./updateAppointmenteUseCase";

class UpdateAppointmenteController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      id,
      docNum,
      status,
      create_user,
      op,
      nota,
      bch,
      feedstock,
      partNumber,
      client,
      address,
      descriptionInspection,
      firstInspection,
      quantityTotal,
      quantityApproved,
      quantityRejected,
      provider,
    } = request.body;

    try {
      const updateAppointmenteController= container.resolve(UpdateAppointmenteUseCase);

      const appointments_response = await updateAppointmenteController.execute({
        id,
        docNum,
        status,
        create_user,
        op,
        nota,
        bch,
        feedstock,
        partNumber,
        client,
        address,
        descriptionInspection,
        firstInspection,
        quantityTotal,
        quantityApproved,
        quantityRejected,
        provider,
      });
      return response.status(201).json(appointments_response);
    }catch (error) {
      return response.status(400).json({error});
    }
  }
}
export {UpdateAppointmenteController};
