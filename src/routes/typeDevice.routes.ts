import { Router } from "express";
import { getRepository } from "typeorm";
import { Criterions } from '../modules/instrument/entities/Criterions';
import { TypeDevices } from "../modules/instrument/entities/TypeDevice";
import { TypeDeviceOrModels } from "../modules/instrument/entities/TypeDeviceOrModel";
import { TypeImages } from "../modules/instrument/entities/TypeImages";
import { TypeCriterions } from '../modules/instrument/entities/TypeCriterion';
import { TypeRangeUses } from '../modules/instrument/entities/TypeRangeUses';
import { TypeResolutions} from '../modules/instrument/entities/TypeResolution';
import { CreateTypeDeviceController } from "../modules/instrument/useCases/TypeDevice/createTypeDevice/createTypeDeviceController";
import { ListTypeDeviceController } from "../modules/instrument/useCases/TypeDevice/listTypeDevice/ListTypeDeviceController";
import { UpdateTypeDeviceController } from "../modules/instrument/useCases/TypeDevice/updateTypeDevice/updateTypeDeviceController";

const typeDeviceRoutes = Router ();

const createTypeDeviceController = new CreateTypeDeviceController();
const listTypeDeviceController = new ListTypeDeviceController();
const updateTypeDeviceController = new UpdateTypeDeviceController();

typeDeviceRoutes.post("/", createTypeDeviceController.handle);

typeDeviceRoutes.get("/",listTypeDeviceController.handle);

typeDeviceRoutes.put("/edit",updateTypeDeviceController.handle);

typeDeviceRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeDeviceRepository = getRepository(TypeDevices)
    const typeDeviceOrModelRepository = getRepository(TypeDeviceOrModels)

    const typeDevice = await typeDeviceRepository.createQueryBuilder("td")
    .where("td.typeDevice_id = :id", {id})
    .getOne();

    const typeDeviceOrModel = await typeDeviceOrModelRepository.createQueryBuilder("tdm")
    .where("tdm.device_id = :id", {id})
    .getMany();

    const typeDeviceImage = await typeDeviceRepository.createQueryBuilder("device")
    .select(["device.typeDevice_id", "img.typeImages_id", "img.image_url", "img.cancel"])
    .leftJoin(TypeImages, "img", "img.typeDevice_id = device.typeDevice_id")
    .where("device.typeDevice_id = :id", {id})
    .andWhere("img.cancel = 'N'")
    .getRawMany();

    return response.json({typeDevice, typeDeviceOrModel, typeDeviceImage});

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDeviceRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeDeviceRepository = getRepository(TypeDevices)
    const typeDeviceOrModelRepository = getRepository(TypeDeviceOrModels)

    const typeDevice = await typeDeviceRepository.createQueryBuilder("td")
    .where("td.typeDevice_id = :id", {id})
    .getOne();

    const typeDeviceOrModel = await typeDeviceOrModelRepository.createQueryBuilder("tdm")
    .where("tdm.device_id = :id", {id})
    .getMany();

    const typeDeviceImage = await typeDeviceRepository.createQueryBuilder("device")
    .select(["device.typeDevice_id", "img.typeImages_id", "img.image_url", "img.cancel"])
    .leftJoin(TypeImages, "img", "img.typeDevice_id = device.typeDevice_id")
    .where("device.typeDevice_id = :id", {id})
    .andWhere("img.cancel = 'N'")
    .getRawMany();

    return response.json({typeDevice, typeDeviceOrModel, typeDeviceImage});

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDeviceRoutes.get("/viewCalibration/:id",  async (request, response) => {

  const {id} = request.params;
  const typeDeviceRepository = getRepository(TypeDevices)

  try {

    const typeDeviceImage = await typeDeviceRepository.createQueryBuilder("device")
    .select(["device.typeDevice_id, tc.description, tc.value, tru.minimum, tru.maximum, tr.description as resolution_description, cr.criterion_id "])
    .leftJoin(Criterions,"cr","cr.id_instrument = device.typeDevice_id")
    .leftJoin(TypeCriterions,"tc", "tc.typeCriterion_id = cr.typeCriterion_id")
    .leftJoin(TypeResolutions, "tr", "tr.typeResolution_id = cr.typeResolution_id ")
    .leftJoin(TypeRangeUses, "tru", "tru.typeRangeUse_id = cr.typeRangeUse_id ")
    .where("device.typeDevice_id = :id", {id})
    .andWhere("img.cancel = 'N'")
    .getRawMany();

    return response.json(typeDeviceImage);

  } catch (error) {
    return response.status(400).json({error})
  }
})

typeDeviceRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeDeviceRepository = getRepository(TypeDevices)

    const typeDevice = await typeDeviceRepository.createQueryBuilder("td")
    .where("td.typeDevice_id = :id", {id})
    .getOne();

    const typeDeviceCancel = {
      ...typeDevice,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeDeviceRepository.save(typeDeviceCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDeviceRoutes.get("/list/active", async (request, response) => {
  try {
    const typeDeviceRepository = getRepository(TypeDevices)

    const typeDevice = await typeDeviceRepository.createQueryBuilder("td")
    .select(['td.typeDevice_id', 'td.docNum', 'td.developed', 'td.frequency', 'td.location', 'td.responsible','td.customer', 'td.status', 'td.criterion','td.note','td.inactive','pn.item','pn.created_at', 'pn.typeDeviceOrModel_id'])
    .leftJoin(TypeDeviceOrModels,"pn","pn.device_id = td.typeDevice_id")
    .where("td.cancel = 'N'")
    .orderBy("td.docNum", "DESC")
    .getRawMany()

    return response.json(typeDevice);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDeviceRoutes.get("/list/activeDevice", async (request, response) => {
  try {
    const typeDeviceRepository = getRepository(TypeDevices)

    const typeDevice = await typeDeviceRepository.createQueryBuilder("td")
    .select(['td.typeDevice_id', 'td.docNum', 'td.developed', 'td.frequency', 'td.location', 'td.responsible','td.customer', 'td.status','td.criterion','td.note', 'td.inactive'])
    .where("td.cancel = 'N'")
    .orderBy("td.docNum", "DESC")
    .getRawMany()

    return response.json(typeDevice);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDeviceRoutes.get("/numTypeDevice", async (request, response) => {
  try {

      const typeDeviceRepository = getRepository(TypeDevices);
      const typeDevice = await typeDeviceRepository.createQueryBuilder("td")
      .orderBy("td.typeDevice_id", "DESC")
      .where("td.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeDevice);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeDeviceRoutes};
