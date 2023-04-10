import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeDeviceOrModels } from "../modules/instrument/entities/TypeDeviceOrModel";
import { TypeModels } from "../modules/instrument/entities/TypeModel";
import { CreateTypeDeviceOrModelController } from "../modules/instrument/useCases/TypeDeviceOrModel/createTypeDeviceOrModel/createTypeDeviceOrModelController";
import { ListTypeDeviceOrModelController } from "../modules/instrument/useCases/TypeDeviceOrModel/listTypeDeviceOrModel/ListTypeDeviceOrModelController";
import { UpdateTypeDeviceOrModelController } from "../modules/instrument/useCases/TypeDeviceOrModel/updateTypeDeviceOrModel/updateTypeDeviceOrModelController";

const typeDeviceOrModelRoutes = Router ();

const createTypeDeviceOrModelController = new CreateTypeDeviceOrModelController();
const listTypeDeviceOrModelController = new ListTypeDeviceOrModelController();
const updateTypeDeviceOrModelController = new UpdateTypeDeviceOrModelController();


typeDeviceOrModelRoutes.post("/", createTypeDeviceOrModelController.handle);

typeDeviceOrModelRoutes.get("/",listTypeDeviceOrModelController.handle);

typeDeviceOrModelRoutes.put("/edit",updateTypeDeviceOrModelController.handle);

typeDeviceOrModelRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeDeviceOrModelRepository = getRepository(TypeDeviceOrModels)
    const typeDeviceOrModel = await typeDeviceOrModelRepository.createQueryBuilder("tdm")
    .where("tdm.typeDeviceOrModel_id = :id", {id})
    .getOne();

    return response.json(typeDeviceOrModel);

  } catch (error) {

  }
})

typeDeviceOrModelRoutes.put("/cancel", async (request, response) => {
  try {
    const {id} = request.body;
    const typeDeviceOrModelRepository = getRepository(TypeDeviceOrModels)

    const typeDeviceOrModel = await typeDeviceOrModelRepository.createQueryBuilder("tdm")
    .where("tdm.typeDeviceOrModel_id = :id", {id})
    .getOne();

    const typeDeviceOrModelCancel = {
      ...typeDeviceOrModel,
      cancel_date: new Date(),
      cancel_user: "Carolina",
      cancel: "Y"
    }
    await typeDeviceOrModelRepository.save(typeDeviceOrModelCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDeviceOrModelRoutes.get("/list/active", async (request, response) => {
  try {
    const typeDeviceOrModelRepository = getRepository(TypeDeviceOrModels)

    const typeDeviceOrModel = await typeDeviceOrModelRepository.createQueryBuilder("tdm")
    .where("tdm.cancel = 'N'")
    .getRawMany()

    return response.json(typeDeviceOrModel);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDeviceOrModelRoutes.get("/list/active2", async (request, response) => {
  try {
    const typeModelRepository = getRepository(TypeDeviceOrModels)

    const typeDeviceOrModels = await typeModelRepository.createQueryBuilder("pn")
    .select(['pn.typeDeviceOrModel_id','pn.item','pn.created_at','pn.model_id','tm.typeModel_id', 'tm.docNum', 'tm.developed', 'tm.location', 'tm.responsible','tm.customer', 'tm.status', 'tm.inactive','tm.created_at'])
    .leftJoin(TypeModels,"tm","tm.typeModel_id = pn.model_id")
    .where("tm.inactive = 'N'")
    .getRawMany()

    return response.json(typeDeviceOrModels);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDeviceOrModelRoutes.get("/numTypeDeviceOrModel", async (request, response) => {
  try {

      const typeDeviceOrModelRepository = getRepository(TypeDeviceOrModels);
      const typeDeviceOrModel = await typeDeviceOrModelRepository.createQueryBuilder("tdm")
      .orderBy("tdm.typeDeviceOrModel_id", "DESC")
      .where("tdm.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeDeviceOrModel);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeDeviceOrModelRoutes};
