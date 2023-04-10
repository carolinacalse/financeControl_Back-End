import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeCriterions } from "../modules/instrument/entities/TypeCriterion";
import { CreateTypeCriterionController } from "../modules/instrument/useCases/TypeCriterion/createTypeCriterion/createTypeCriterionController";import { ListTypeCriterionController } from "../modules/instrument/useCases/TypeCriterion/listTypeCriterion/ListTypeCriterionController";
import { UpdateTypeCriterionController } from "../modules/instrument/useCases/TypeCriterion/updateTypeCriterion/updateTypeCriterionController";

const typeCriterionRoutes = Router ();

const createTypeCriterionController = new CreateTypeCriterionController();
const listTypeCriterionController = new ListTypeCriterionController();
const updateTypeCriterionController = new UpdateTypeCriterionController();


typeCriterionRoutes.post("/", createTypeCriterionController.handle);

typeCriterionRoutes.get("/",listTypeCriterionController.handle);

typeCriterionRoutes.put("/edit",updateTypeCriterionController.handle);

typeCriterionRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeCriterionRepository = getRepository(TypeCriterions)
    const typeCriterion = await typeCriterionRepository.createQueryBuilder("tc")
    .where("tc.typeCriterion_id = :id", {id})
    .getOne();

    return response.json(typeCriterion);

  } catch (error) {

  }
})

typeCriterionRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeCriterionRepository = getRepository(TypeCriterions)

    const typeCriterion = await typeCriterionRepository.createQueryBuilder("tc")
    .where("tc.typeCriterion_id = :id", {id})
    .getOne();

    const typeCriterionCancel = {
      ...typeCriterion,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeCriterionRepository.save(typeCriterionCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeCriterionRoutes.get("/list/active", async (request, response) => {
  try {
    const typeCriterionRepository = getRepository(TypeCriterions)

    const typeCriterion = await typeCriterionRepository.createQueryBuilder("tc")
    .orderBy("tc.docNum", "DESC")
    .where("tc.cancel = 'N'")
    .getRawMany()

    return response.json(typeCriterion);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeCriterionRoutes.get("/numTypeCriterion", async (request, response) => {
  try {

      const typeCriterionRepository = getRepository(TypeCriterions);
      const typeCriterion = await typeCriterionRepository.createQueryBuilder("tc")
      .orderBy("tc.typeCriterion_id", "DESC")
      .where("tc.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeCriterion);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeCriterionRoutes};
