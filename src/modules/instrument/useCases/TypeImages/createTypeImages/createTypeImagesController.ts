import {Request, Response} from "express";
import {container} from "tsyringe";
import { CreateTypeImagesUseCase } from "./createTypeImagesUseCase";

class CreateTypeImagesController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      image_name,
      typeDevice_id,
      typeModel_id,
      typeCalibration_id,
      id_appointment,
      id_instrument,
      typealert_id,
      id_action,
      selected,
    } = request.body;

    const uploadImagesUseCase = container.resolve(CreateTypeImagesUseCase);

    const responseImage = await uploadImagesUseCase.execute({
      image_name,
      typeDevice_id,
      typeModel_id,
      typeCalibration_id,
      id_instrument,
      id_appointment,
      typealert_id,
      id_action,
      selected,
      image_url: request.file.filename ? `${process.env.REACT_APP_API_URL}/filesfinanceControl/${request.file.filename}` : ''
    });
    return response.json([responseImage]);
  }
}


export {CreateTypeImagesController};
