import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeFrequencys } from "../modules/instrument/entities/TypeFrequencys";
import { CreateTypeFrequencyController } from "../modules/instrument/useCases/TypeFrequency/createTypeFrequency/createTypeFrequencyController";
import { ListTypeFrequencyController } from "../modules/instrument/useCases/TypeFrequency/listTypeFrequency/ListTypeFrequencyController";
import { UpdateTypeFrequencyController } from "../modules/instrument/useCases/TypeFrequency/updateTypeFrequency/updateTypeFrequencyController";

const typeFrequencyRoutes = Router ();

const createTypeFrequencyController = new CreateTypeFrequencyController();
const listTypeFrequencyController = new ListTypeFrequencyController();
const updateTypeFrequencyController = new UpdateTypeFrequencyController();


typeFrequencyRoutes.post("/", createTypeFrequencyController.handle);

typeFrequencyRoutes.get("/",listTypeFrequencyController.handle);

typeFrequencyRoutes.put("/edit",updateTypeFrequencyController.handle);

typeFrequencyRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeFrequencyRepository = getRepository(TypeFrequencys)
    const typeFrequency = await typeFrequencyRepository.createQueryBuilder("tf")
    .where("tf.typeFrequency_id = :id", {id})
    .getOne();

    return response.json(typeFrequency);

  } catch (error) {

  }
})

typeFrequencyRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeFrequencyRepository = getRepository(TypeFrequencys)

    const typeFrequency = await typeFrequencyRepository.createQueryBuilder("tf")
    .where("tf.typeFrequency_id = :id", {id})
    .getOne();

    const typeFrequencyCancel = {
      ...typeFrequency,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeFrequencyRepository.save(typeFrequencyCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeFrequencyRoutes.get("/list/active", async (request, response) => {
  try {
    const typeFrequencyRepository = getRepository(TypeFrequencys)

    const typeFrequency = await typeFrequencyRepository.createQueryBuilder("tf")
    .orderBy("tf.docNum", "DESC")
    .where("tf.cancel = 'N'")
    .getRawMany()

    return response.json(typeFrequency);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeFrequencyRoutes.get("/numTypeFrequency", async (request, response) => {
  try {

      const typeFrequencyRepository = getRepository(TypeFrequencys);
      const typeFrequency = await typeFrequencyRepository.createQueryBuilder("tf")
      .orderBy("tf.typeFrequency_id", "DESC")
      .where("tf.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeFrequency);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeFrequencyRoutes};
