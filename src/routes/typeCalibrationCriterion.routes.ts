import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeCalibrationCriterions } from "../modules/instrument/entities/TypeCalibrationCriterion";
import { CreateTypeCalibrationCriterionController } from "../modules/instrument/useCases/TypeCalibrationCriterion/createTypeCalibrationCriterion/createTypeCalibrationCriterionController";
import { ListTypeCalibrationCriterionController } from "../modules/instrument/useCases/TypeCalibrationCriterion/listTypeCalibrationCriterion/ListTypeCalibrationCriterionController";
import { UpdateTypeCalibrationCriterionController } from "../modules/instrument/useCases/TypeCalibrationCriterion/updateTypeCalibrationCriterion/updateTypeCalibrationCriterionController";

const typeCalibrationCriterionRoutes = Router ();

const createTypeCalibrationCriterionController = new CreateTypeCalibrationCriterionController();
const listTypeCalibrationCriterionController = new ListTypeCalibrationCriterionController();
const updateTypeCalibrationCriterionController = new UpdateTypeCalibrationCriterionController();


typeCalibrationCriterionRoutes.post("/", createTypeCalibrationCriterionController.handle);

typeCalibrationCriterionRoutes.get("/",listTypeCalibrationCriterionController.handle);

typeCalibrationCriterionRoutes.put("/edit",updateTypeCalibrationCriterionController.handle);

typeCalibrationCriterionRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;

    const typeCalibrationCriterionRepository = getRepository(TypeCalibrationCriterions)
    const typeCalibrationCriterion = await typeCalibrationCriterionRepository.createQueryBuilder("tcc")
    .where("tcc.typeCalibrationCriterion_id = :id", {id})
    .getOne();

    return response.json({typeCalibrationCriterion});

  } catch (error) {

  }
})

typeCalibrationCriterionRoutes.put("/cancel", async (request, response) => {
  try {
    const {id} = request.body;
    const typeCalibrationCriterionRepository = getRepository(TypeCalibrationCriterions)

    const typeCalibrationCriterion = await typeCalibrationCriterionRepository.createQueryBuilder("tcc")
    .where("tcc.typeCalibrationCriterion_id = :id", {id})
    .getOne();

    const typeCalibrationCriterionCancel = {
      ...typeCalibrationCriterion,
      cancel_date: new Date(),
      cancel_user: "",
      cancel: "Y"
    }
    await typeCalibrationCriterionRepository.save(typeCalibrationCriterionCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeCalibrationCriterionRoutes.get("/list/active", async (request, response) => {
  try {
    const typeCalibrationCriterionRepository = getRepository(TypeCalibrationCriterions)

    const typeCalibrationCriterion = await typeCalibrationCriterionRepository.createQueryBuilder("tcc")
    .where("tcc.cancel = 'N'")
    .orderBy("tcc.docNum", "DESC")
    .getRawMany()

    return response.json(typeCalibrationCriterion);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeCalibrationCriterionRoutes.get("/numTypeCalibrationCriterion", async (request, response) => {
  try {

      const typeCalibrationCriterionRepository = getRepository(TypeCalibrationCriterions);
      const typeCalibrationCriterion = await typeCalibrationCriterionRepository.createQueryBuilder("tcc")
      .orderBy("tcc.typeCalibrationCriterion_id", "DESC")
      .where("tcc.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeCalibrationCriterion);
  } catch (error) {
      return response.status(400).json({ error })
  }
})



export {typeCalibrationCriterionRoutes};
