import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeAppointmente } from "../modules/appointmente/entities/TypeAppointmente";
import { CreateTypeAppointmenteController } from "../modules/appointmente/useCases/TypeAppointmente/createTypeAppointmente/CreateTypeAppointmenteController";
import { ListTypeAppointmenteController } from "../modules/appointmente/useCases/TypeAppointmente/listTypeAppointmente/ListTypeAppointmenteController";
import { UpdateTypeAppointmenteController } from "../modules/appointmente/useCases/TypeAppointmente/updateTypeAppointmente/updateTypeAppointmenteController";

const typeAppointmenteRoutes = Router ();

const createTypeAppointmenteController = new CreateTypeAppointmenteController();
const listTypeAppointmenteController = new ListTypeAppointmenteController();
const updateTypeAppointmenteController = new UpdateTypeAppointmenteController();


typeAppointmenteRoutes.post("/", createTypeAppointmenteController.handle);

typeAppointmenteRoutes.get("/",listTypeAppointmenteController.handle);

typeAppointmenteRoutes.put("/edit",updateTypeAppointmenteController.handle);

typeAppointmenteRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeAppointmenteRepository = getRepository(TypeAppointmente)
    const typeAppointmente = await typeAppointmenteRepository.createQueryBuilder("ta")
    .where("ta.typeAppointmente_id = :id", {id})
    .getOne();

    return response.json(typeAppointmente);

  } catch (error) {

  }
})

typeAppointmenteRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeAppointmenteRepository = getRepository(TypeAppointmente)

    const typeAppointmente = await typeAppointmenteRepository.createQueryBuilder("ta")
    .where("ta.typeAppointmente_id = :id", {id})
    .getOne();

    const typeAppointmenteCancel = {
      ...typeAppointmente,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeAppointmenteRepository.save(typeAppointmenteCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeAppointmenteRoutes.get("/list/active", async (request, response) => {
  try {
    const typeAppointmenteRepository = getRepository(TypeAppointmente)

    const typeAppointmente = await typeAppointmenteRepository.createQueryBuilder("ta")
    .where("ta.cancel = 'N'")
    .orderBy("ta.docNum", "DESC")
    .getRawMany()

    return response.json(typeAppointmente);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeAppointmenteRoutes.get("/numTypeAppointmente", async (request, response) => {
  try {

      const typeAppointmenteRepository = getRepository(TypeAppointmente);
      const typeAppointmente = await typeAppointmenteRepository.createQueryBuilder("ta")
      .orderBy("ta.typeAppointmente_id", "DESC")
      .where("ta.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeAppointmente);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeAppointmenteRoutes};
