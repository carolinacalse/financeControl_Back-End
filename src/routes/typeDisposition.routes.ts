import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeDispositions } from "../modules/appointmente/entities/TypeDisposition";
import { CreateTypeDispositionController } from "../modules/appointmente/useCases/TypeDisposition/createTypeDisposition/CreateTypeDispositionController";
import { ListTypeDispositionController } from "../modules/appointmente/useCases/TypeDisposition/listTypeDisposition/ListTypeDispositionController";
import { UpdateTypeDispositionController } from "../modules/appointmente/useCases/TypeDisposition/updateTypeDisposition/updateTypeDispositionController";

const typeDispositionRoutes = Router ();

const createTypeDispositionController = new CreateTypeDispositionController();
const listTypeDispositionController = new ListTypeDispositionController();
const updateTypeDispositionController = new UpdateTypeDispositionController();


typeDispositionRoutes.post("/", createTypeDispositionController.handle);

typeDispositionRoutes.get("/",listTypeDispositionController.handle);

typeDispositionRoutes.put("/edit",updateTypeDispositionController.handle);

typeDispositionRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeDispositionRepository = getRepository(TypeDispositions)
    const typeDisposition = await typeDispositionRepository.createQueryBuilder("td")
    .where("td.typeDisposition_id = :id", {id})
    .getOne();

    return response.json(typeDisposition);

  } catch (error) {

  }
})

typeDispositionRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeDispositionRepository = getRepository(TypeDispositions)

    const typeDisposition = await typeDispositionRepository.createQueryBuilder("td")
    .where("td.typeDisposition_id = :id", {id})
    .getOne();

    const typeDispositionCancel = {
      ...typeDisposition,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeDispositionRepository.save(typeDispositionCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDispositionRoutes.get("/list/active", async (request, response) => {
  try {
    const typeDispositionRepository = getRepository(TypeDispositions)

    const typeDisposition = await typeDispositionRepository.createQueryBuilder("td")
    .orderBy("td.docNum", "DESC")
    .where("td.cancel = 'N'")
    .getRawMany()

    return response.json(typeDisposition);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDispositionRoutes.get("/list/typeDispositionReport", async (request, response) => {
  try {
    const typeDispositionRepository = getRepository(TypeDispositions)

    const typeDisposition = await typeDispositionRepository.createQueryBuilder("typedisp")
    .orderBy("typedisp.docNum", "DESC")
    .where("typedisp.cancel = 'N'")
    .getRawMany()

    return response.json(typeDisposition);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDispositionRoutes.get("/numTypeDisposition", async (request, response) => {
  try {

      const typeDispositionRepository = getRepository(TypeDispositions);
      const typeDisposition = await typeDispositionRepository.createQueryBuilder("td")
      .orderBy("td.typeDisposition_id", "DESC")
      .where("td.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeDisposition);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeDispositionRoutes};
