import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeDefects } from "../modules/appointmente/entities/TypeDefects";
import { CreateTypeDefectController } from "../modules/appointmente/useCases/TypeDefect/createTypeDefect/CreateTypeDefectController";
import { ListTypeDefectController } from "../modules/appointmente/useCases/TypeDefect/listTypeDefect/ListTypeDefectController";
import { UpdateTypeDefectController } from "../modules/appointmente/useCases/TypeDefect/updateTypeDefect/updateTypeDefectController";

const typeDefectRoutes = Router ();

const createTypeDefectController = new CreateTypeDefectController();
const listTypeDefectController = new ListTypeDefectController();
const updateTypeDefectController = new UpdateTypeDefectController();


typeDefectRoutes.post("/", createTypeDefectController.handle);

typeDefectRoutes.get("/",listTypeDefectController.handle);

typeDefectRoutes.put("/edit",updateTypeDefectController.handle);

typeDefectRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeDefectRepository = getRepository(TypeDefects)
    const typeDefect = await typeDefectRepository.createQueryBuilder("td")
    .where("td.typeDefect_id = :id", {id})
    .getOne();

    return response.json(typeDefect);

  } catch (error) {

  }
})

typeDefectRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeDefectRepository = getRepository(TypeDefects)

    const typeDefect = await typeDefectRepository.createQueryBuilder("td")
    .where("td.typeDefect_id = :id", {id})
    .getOne();

    const typeDefectCancel = {
      ...typeDefect,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeDefectRepository.save(typeDefectCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDefectRoutes.get("/list/active", async (request, response) => {
  try {
    const typeDefectRepository = getRepository(TypeDefects)

    const typeDefect = await typeDefectRepository.createQueryBuilder("td")
    .orderBy("td.docNum", "DESC")
    .where("td.cancel = 'N'")
    .getRawMany()

    return response.json(typeDefect);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeDefectRoutes.get("/numTypeDefect", async (request, response) => {
  try {

      const typeDefectRepository = getRepository(TypeDefects);
      const typeDefect = await typeDefectRepository.createQueryBuilder("td")
      .orderBy("td.typeDefect_id", "DESC")
      .where("td.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeDefect);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeDefectRoutes};
