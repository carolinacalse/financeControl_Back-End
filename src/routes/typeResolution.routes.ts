import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeResolutions } from "../modules/instrument/entities/TypeResolution";
import { CreateTypeResolutionController } from "../modules/instrument/useCases/TypeResolution/createTypeResolution/createTypeResolutionController";
import { ListTypeResolutionController } from "../modules/instrument/useCases/TypeResolution/listTypeResolution/ListTypeResolutionController";
import { UpdateTypeResolutionController } from "../modules/instrument/useCases/TypeResolution/updateTypeResolution/updateTypeResolutionController";

const typeResolutionRoutes = Router ();

const createTypeResolutionController = new CreateTypeResolutionController();
const listTypeResolutionController = new ListTypeResolutionController();
const updateTypeResolutionController = new UpdateTypeResolutionController();


typeResolutionRoutes.post("/", createTypeResolutionController.handle);

typeResolutionRoutes.get("/",listTypeResolutionController.handle);

typeResolutionRoutes.put("/edit",updateTypeResolutionController.handle);

typeResolutionRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeResolutionRepository = getRepository(TypeResolutions)
    const typeResolution = await typeResolutionRepository.createQueryBuilder("tr")
    .where("tr.typeResolution_id = :id", {id})
    .getOne();

    return response.json(typeResolution);

  } catch (error) {

  }
})

typeResolutionRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeResolutionRepository = getRepository(TypeResolutions)

    const typeResolution = await typeResolutionRepository.createQueryBuilder("tr")
    .where("tr.typeResolution_id = :id", {id})
    .getOne();

    const typeResolutionCancel = {
      ...typeResolution,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeResolutionRepository.save(typeResolutionCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeResolutionRoutes.get("/list/active", async (request, response) => {
  try {
    const typeResolutionRepository = getRepository(TypeResolutions)

    const typeResolution = await typeResolutionRepository.createQueryBuilder("tr")
    .orderBy("tr.docNum", "DESC")
    .where("tr.cancel = 'N'")
    .getRawMany()

    return response.json(typeResolution);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeResolutionRoutes.get("/numTypeResolution", async (request, response) => {
  try {

      const typeResolutionRepository = getRepository(TypeResolutions);
      const typeResolution = await typeResolutionRepository.createQueryBuilder("tr")
      .orderBy("tr.typeResolution_id", "DESC")
      .where("tr.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeResolution);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeResolutionRoutes};
