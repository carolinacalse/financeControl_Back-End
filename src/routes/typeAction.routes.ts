import { Router } from "express";
import { getRepository } from "typeorm";
import { Appointments } from "../modules/appointmente/entities/Appointments";
import { NotConforms } from "../modules/appointmente/entities/NotConforms";
import { TypeActions } from "../modules/appointmente/entities/TypeAction";
import { CreateTypeActionController } from "../modules/appointmente/useCases/TypeAction/createTypeAction/CreateTypeActionController";
import { ListTypeActionController } from "../modules/appointmente/useCases/TypeAction/listTypeAction/ListTypeActionController";
import { UpdateTypeActionController } from "../modules/appointmente/useCases/TypeAction/updateTypeAction/updateTypeActionController";
import { TypeImages } from "../modules/instrument/entities/TypeImages";

const typeActionRoutes = Router ();

const createTypeActionController = new CreateTypeActionController();
const listTypeActionController = new ListTypeActionController();
const updateTypeActionController = new UpdateTypeActionController();


typeActionRoutes.post("/", createTypeActionController.handle);

typeActionRoutes.get("/",listTypeActionController.handle);

typeActionRoutes.put("/edit",updateTypeActionController.handle);

typeActionRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeActionRepository = getRepository(TypeActions)
    const typeAction = await typeActionRepository.createQueryBuilder("ta")
    .select(["ta.docNum","ta.typeAction_id", "ta.description", "ta.action", "ta.inactive", "ta.action_origin","ta.comments","ta.deadline","ta.status","ta.description","ta.externalAction","ta.follow","ta.localization","ta.follow","ta.responsible","ta.type","ta.id_rnc", "apt.id", "apt.partNumber", "apt.quantityRejected", "apt.client", "apt.cancel","nc.causativeProcess","nc.defectClassification", "nc.defectClassification"])
    .leftJoin(Appointments, "apt", "apt.docNum = ta.id_rnc and apt.cancel = 'N'")
    .leftJoin(NotConforms,"nc","nc.appointmente_id = apt.id")
    .where("ta.typeAction_id = :id", {id})
    .getRawMany();

    const typeActionImage = await typeActionRepository.createQueryBuilder("taa")
    .select(["taa.typeAction_id", "img.typeImages_id", "img.image_url", "img.selected", "img.cancel"])
    .leftJoin(TypeImages, "img", "img.id_action= taa.typeAction_id")
    .where("taa.typeAction_id = :id", {id})
    .andWhere("img.cancel = 'N'")
    .getRawMany();

    return response.json({typeAction, typeActionImage});

  } catch (error) {
  console.log(error);
  }
})


typeActionRoutes.put("/updateStatus", async (request, response) => {
  try {
    const {id} = request.body;
    const typeActionRepository = getRepository(TypeActions)

    const typeAction = await typeActionRepository.createQueryBuilder("ta")
    .where("ta.typeAction_id = :id", {id})
    .getOne();

    const actionCancel = {
      ...typeAction,
      status: "Finalizado",
      action_terminated: "Y"

    }
    await typeActionRepository.save(actionCancel);
    return response.send("Finalizado");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeActionRoutes.put("/updateAction", async (request, response) => {
  try {
    const {id} = request.body;
    const typeActionRepository = getRepository(TypeActions)

    const typeAction = await typeActionRepository.createQueryBuilder("ta")
    .where("ta.typeAction_id = :id", {id})
    .getOne();

    const actionUpdate = {
      ...typeAction,
      action: "Sim",

    }
    await typeActionRepository.save(actionUpdate);
    return response.send("Ação Atualizada");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeActionRoutes.put("/updateActionNo", async (request, response) => {
  try {
    const {id} = request.body;
    const typeActionRepository = getRepository(TypeActions)

    const typeAction = await typeActionRepository.createQueryBuilder("ta")
    .where("ta.typeAction_id = :id", {id})
    .getOne();

    const actionUpdate = {
      ...typeAction,
      action: "Não",

    }
    await typeActionRepository.save(actionUpdate);
    return response.send("Ação Atualizada");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeActionRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeActionRepository = getRepository(TypeActions)

    const typeAction = await typeActionRepository.createQueryBuilder("ta")
    .where("ta.typeAction_id = :id", {id})
    .getOne();

    const typeActionCancel = {
      ...typeAction,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeActionRepository.save(typeActionCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeActionRoutes.get("/list/active", async (request, response) => {
  try {
    const typeActionRepository = getRepository(TypeActions)

    const typeAction = await typeActionRepository.createQueryBuilder("ta")
    .where("ta.cancel = 'N'")
    .orderBy("ta.status", "ASC")
    .addOrderBy("ta.docNum", "DESC")
    .getRawMany()

    return response.json(typeAction);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeActionRoutes.get("/numTypeAction", async (request, response) => {
  try {

      const typeActionRepository = getRepository(TypeActions);
      const typeAction = await typeActionRepository.createQueryBuilder("ta")
      .orderBy("ta.typeAction_id", "DESC")
      .where("ta.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeAction);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeActionRoutes};
