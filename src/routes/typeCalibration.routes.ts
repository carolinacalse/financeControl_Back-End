import { Router } from "express";
import { getRepository } from "typeorm";
import { Instruments } from "../modules/instrument/entities/Instruments";
import { Criterions } from '../modules/instrument/entities/Criterions';
import { TypeResolutions} from '../modules/instrument/entities/TypeResolution';
import { TypeRangeUses } from '../modules/instrument/entities/TypeRangeUses';
import { TypeCalibrations } from "../modules/instrument/entities/TypeCalibration";
import { TypeCalibrationCriterions } from "../modules/instrument/entities/TypeCalibrationCriterion";
import { TypeDevices } from "../modules/instrument/entities/TypeDevice";
import { TypeImages } from "../modules/instrument/entities/TypeImages";
import { TypeModels } from "../modules/instrument/entities/TypeModel";
import { CreateTypeCalibrationController } from "../modules/instrument/useCases/TypeCalibration/createTypeCalibration/createTypeCalibrationController";
import { ListTypeCalibrationController } from "../modules/instrument/useCases/TypeCalibration/listTypeCalibration/ListTypeCalibrationController";
import { UpdateTypeCalibrationController } from "../modules/instrument/useCases/TypeCalibration/updateTypeCalibration/updateTypeCalibrationController";

const typeCalibrationRoutes = Router ();

const createTypeCalibrationController = new CreateTypeCalibrationController();
const listTypeCalibrationController = new ListTypeCalibrationController();
const updateTypeCalibrationController = new UpdateTypeCalibrationController();


typeCalibrationRoutes.post("/", createTypeCalibrationController.handle);

typeCalibrationRoutes.get("/",listTypeCalibrationController.handle);

typeCalibrationRoutes.put("/edit",updateTypeCalibrationController.handle);

typeCalibrationRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;

    const typeCalibrationRepository = getRepository(TypeCalibrations)
    const typeCalibration = await typeCalibrationRepository.createQueryBuilder("tc")
    .where("tc.typeCalibration_id = :id", {id})
    .getOne();


    const typeCalibrationImage = await typeCalibrationRepository.createQueryBuilder("calibration")
    .select(["calibration.typeCalibration_id", "img.typeImages_id", "img.image_url", "img.cancel"])
    .leftJoin(TypeImages, "img", "img.typeCalibration_id = calibration.typeCalibration_id")
    .where("calibration.typeCalibration_id = :id", {id})
    .andWhere("img.cancel = 'N'")
    .getRawMany();


    const typeCalibrationCriterionRepository = getRepository(TypeCalibrationCriterions)
    const typeCalibrationCriterion = await typeCalibrationCriterionRepository.createQueryBuilder("tcc")
    .select(["tcc.typeCalibrationCriterion_id", "tcc.criterion_id", "tcc.description", "tcc.value", "tcc.uncertainty", "tcc.error", "tcc.amount", "tcc.statusLine", "tcc.typeCalibration_id", "tr.description", "tru.minimum", "tru.maximum"])
    .innerJoin(Criterions, "c", "c.criterion_id = tcc.criterion_id")
    .leftJoin(TypeResolutions, "tr", "tr.typeResolution_id = c.typeResolution_id")
    .leftJoin(TypeRangeUses, "tru", "tru.typeRangeUse_id = c.typeRangeUse_id")
    .where("tcc.typeCalibration_id = :id", {id})
    .getRawMany();

    return response.json({typeCalibration, typeCalibrationImage, typeCalibrationCriterion});

  } catch (error) {
    return response.status(400).json({error})
  }
})

typeCalibrationRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeCalibrationRepository = getRepository(TypeCalibrations)

    const typeCalibration = await typeCalibrationRepository.createQueryBuilder("tc")
    .where("tc.typeCalibration_id = :id", {id})
    .getOne();

    const typeCalibrationCancel = {
      ...typeCalibration,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeCalibrationRepository.save(typeCalibrationCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeCalibrationRoutes.get("/list/active", async (request, response) => {
  try {
    const typeCalibrationRepository = getRepository(TypeCalibrations)

    const typeCalibration = await typeCalibrationRepository.createQueryBuilder("tc")
    .where("tc.cancel = 'N'")
    .orderBy("tc.docNum", "DESC")
    .getRawMany()

    return response.json(typeCalibration);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeCalibrationRoutes.get("/numTypeCalibration", async (request, response) => {
  try {

      const typeCalibrationRepository = getRepository(TypeCalibrations);
      const typeCalibration = await typeCalibrationRepository.createQueryBuilder("tc")
      .orderBy("tc.typeCalibration_id", "DESC")
      .where("tc.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeCalibration);
  } catch (error) {
      return response.status(400).json({ error })
  }
})

typeCalibrationRoutes.get("/list/edited", async (request, response) => {
  try {
    const typeCalibrationRepository = getRepository(TypeCalibrations)

    const typeCalibration = await typeCalibrationRepository.createQueryBuilder("tc")
    .select(["tc.typeCalibration_id", "tc.docNum", "tc.type", "tc.item","tc.id_model", "tc.id_instrument", "tc.id_device", "tc.finalReport", "tc.nextCalibration", "tc.inactive", "in.description", "td.docNum", "tm.docNum",])
    .leftJoin(Instruments, "in", "in.id_instrument = tc.id_instrument")
    .leftJoin(TypeDevices, "td", "td.typeDevice_id = tc.id_device")
    .leftJoin(TypeModels, "tm", "tm.typeModel_id = tc.id_model")
    .where("tc.cancel = 'N'")
    .orderBy("tc.docNum", "DESC")
    .getRawMany()

    return response.json(typeCalibration);

  } catch (error) {
    return response.status(400).json({error})
  }
});

export {typeCalibrationRoutes};
