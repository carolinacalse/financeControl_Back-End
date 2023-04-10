import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeModels } from "../modules/instrument/entities/TypeModel";
import { TypeDeviceOrModels } from '../modules/instrument/entities/TypeDeviceOrModel';
import { CreateTypeModelController } from "../modules/instrument/useCases/TypeModel/createTypeModel/createTypeModelController";
import { ListTypeModelController } from "../modules/instrument/useCases/TypeModel/listTypeModel/ListTypeModelController";
import { UpdateTypeModelController } from "../modules/instrument/useCases/TypeModel/updateTypeModel/updateTypeModelController";
import { TypeImages } from "../modules/instrument/entities/TypeImages";

const typeModelRoutes = Router ();

const createTypeModelController = new CreateTypeModelController();
const listTypeModelController = new ListTypeModelController();
const updateTypeModelController = new UpdateTypeModelController();


typeModelRoutes.post("/", createTypeModelController.handle);

typeModelRoutes.get("/",listTypeModelController.handle);

typeModelRoutes.put("/edit",updateTypeModelController.handle);

typeModelRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeModelRepository = getRepository(TypeModels)
    const typeDeviceOrModelRepository = getRepository(TypeDeviceOrModels)

    const typeModel = await typeModelRepository.createQueryBuilder("tm")
    .where("tm.typeModel_id = :id", {id})
    .getOne();

    const typeDeviceOrModel = await typeDeviceOrModelRepository.createQueryBuilder("tdm")
    .where("tdm.model_id = :id", {id})
    .getMany();

    const typeModelImage = await typeModelRepository.createQueryBuilder("model")
    .select(["model.typeModel_id", "img.typeImages_id", "img.image_url", "img.cancel"])
    .leftJoin(TypeImages, "img", "img.typeModel_id = model.typeModel_id")
    .where("model.typeModel_id = :id", {id})
    .andWhere("img.cancel = 'N'")
    .getRawMany();

    return response.json({typeModel, typeDeviceOrModel, typeModelImage});

  } catch (error) {
    console.log(error);
  }
})

typeModelRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeModelRepository = getRepository(TypeModels)

    const typeModel = await typeModelRepository.createQueryBuilder("tm")
    .where("tm.typeModel_id = :id", {id})
    .getOne();

    const typeModelCancel = {
      ...typeModel,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeModelRepository.save(typeModelCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeModelRoutes.get("/list/active", async (request, response) => {
  try {
    const typeModelRepository = getRepository(TypeModels)

    const typeModel = await typeModelRepository.createQueryBuilder("tm")
    .select(['tm.typeModel_id', 'tm.docNum', 'tm.developed', 'tm.frequency', 'tm.location', 'tm.responsible','tm.customer', 'tm.status', 'tm.inactive','pn.item','pn.created_at'])
    .leftJoin(TypeDeviceOrModels,"pn","pn.model_id = tm.typeModel_id")
    .where("tm.cancel = 'N'")
    .orderBy("tm.docNum", "DESC")
    .getRawMany()

    return response.json(typeModel);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeModelRoutes.get("/list/activeModel", async (request, response) => {
  try {
    const typeModelRepository = getRepository(TypeModels)

    const typeModel = await typeModelRepository.createQueryBuilder("tm")
    .select(['tm.typeModel_id', 'tm.docNum', 'tm.developed', 'tm.frequency', 'tm.location', 'tm.responsible','tm.customer', 'tm.status', 'tm.inactive'])
    .where("tm.cancel = 'N'")
    .orderBy("tm.docNum", "DESC")
    .getRawMany()

    return response.json(typeModel);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeModelRoutes.get("/numTypeModel", async (request, response) => {
  try {

      const typeModelRepository = getRepository(TypeModels);
      const typeModel = await typeModelRepository.createQueryBuilder("tm")
      .orderBy("tm.typeModel_id", "DESC")
      .where("tm.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeModel);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeModelRoutes};
