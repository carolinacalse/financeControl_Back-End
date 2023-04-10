import {Router} from 'express';
import { getRepository } from "typeorm";
import { Criterions } from '../modules/instrument/entities/Criterions';
import { CreateCriterionController } from '../modules/instrument/useCases/Criterion/createCriterion/CreateCriterionController';
import { ListCriterionController } from '../modules/instrument/useCases/Criterion/listCriterion/ListCriterionController';
import { UpdateCriterionController } from '../modules/instrument/useCases/Criterion/updateCriterion/updateCriterionController';

const criterionRoutes = Router ();

const createCriterionController = new CreateCriterionController();
const listCriterionController = new ListCriterionController();
const updateCriterionController = new UpdateCriterionController();

criterionRoutes.post("/", createCriterionController.handle);

criterionRoutes.get("/",listCriterionController.handle);

criterionRoutes.put("/edit",updateCriterionController.handle);

criterionRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const criterionRepository = getRepository(Criterions)
    const criterion = await criterionRepository.createQueryBuilder("cr")
    .where("cr.criterion_id = :id", {id})
    .getOne();

    return response.json(criterion);

  } catch (error) {

  }
})

criterionRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const criterionRepository = getRepository(Criterions)

    const criterion = await criterionRepository.createQueryBuilder("cr")
    .where("cr.criterion_id = :id", {id})
    .getOne();

    const criterionCancel = {
      ...criterion,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await criterionRepository.save(criterionCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

criterionRoutes.get("/list/active", async (request, response) => {
  try {
    const criterionRepository = getRepository(Criterions)

    const criterion = await criterionRepository.createQueryBuilder("cr")
    .where("cr.cancel = 'N'")
    .getRawMany()

    return response.json(criterion);

  } catch (error) {
    return response.status(400).json({error})
  }
});



export {criterionRoutes};

