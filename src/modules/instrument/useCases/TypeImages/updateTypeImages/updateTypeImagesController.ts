import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateTypeImagesUseCase } from "./updateTypeImagesUseCase";

class UpdateTypeImagesController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
        typeImages_id,
        image_name,
        image_url,
        typeDevice_id,
        typeModel_id,
        typeCalibration_id,
        id_instrument,
        id_appointment,
        id_action,
    } = request.body;

    try {
    const updateTypeImagesController= container.resolve(UpdateTypeImagesUseCase);

    const types_response = await updateTypeImagesController.execute({
        typeImages_id,
        image_name,
        image_url,
        typeDevice_id,
        typeModel_id,
        typeCalibration_id,
        id_instrument,
        id_appointment,
        id_action,
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateTypeImagesController};
