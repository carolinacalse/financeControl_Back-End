import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeLocals } from "../modules/appointmente/entities/TypeLocal";
import { CreateTypeLocalController } from "../modules/appointmente/useCases/TypeLocal/createTypeLocal/CreateTypeLocalController";
import { ListTypeLocalController } from "../modules/appointmente/useCases/TypeLocal/listTypeLocal/ListTypeLocalController";
import { UpdateTypeLocalController } from "../modules/appointmente/useCases/TypeLocal/updateTypeLocal/updateTypeLocalController";

const typeLocalRoutes = Router ();

const createTypeLocalController = new CreateTypeLocalController();
const listTypeLocalController = new ListTypeLocalController();
const updateTypeLocalController = new UpdateTypeLocalController();


typeLocalRoutes.post("/", createTypeLocalController.handle);

typeLocalRoutes.get("/",listTypeLocalController.handle);

typeLocalRoutes.put("/edit",updateTypeLocalController.handle);

typeLocalRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeLocalRepository = getRepository(TypeLocals)
    const typeLocal = await typeLocalRepository.createQueryBuilder("tl")
    .where("tl.typeLocal_id = :id", {id})
    .getOne();

    return response.json(typeLocal);

  } catch (error) {

  }
})

typeLocalRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeLocalRepository = getRepository(TypeLocals)

    const typeLocal = await typeLocalRepository.createQueryBuilder("tl")
    .where("tl.typeLocal_id = :id", {id})
    .getOne();

    const typeLocalCancel = {
      ...typeLocal,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeLocalRepository.save(typeLocalCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeLocalRoutes.get("/list/active", async (request, response) => {
  try {
    const typeLocalRepository = getRepository(TypeLocals)

    const typeLocal = await typeLocalRepository.createQueryBuilder("tl")
    .where("tl.cancel = 'N'")
    .orderBy("tl.docNum", "DESC")
    .getRawMany()

    return response.json(typeLocal);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeLocalRoutes.get("/list/appointment", async (request, response) => {
  try {
    const typeLocalRepository = getRepository(TypeLocals)

    const typeLocalAppointment = await typeLocalRepository.createQueryBuilder("tl")
    .where("tl.cancel = 'N'")
    .andWhere("tl.type = 'Apontamento'")
    .orderBy("tl.docNum", "DESC")
    .getRawMany()

    const typeLocalCausative = await typeLocalRepository.createQueryBuilder("tlc")
    .where("tlc.cancel = 'N'")
    .andWhere("tlc.type = 'Causador'")
    .orderBy("tlc.docNum", "DESC")
    .getRawMany()

    return response.json({typeLocalCausative, typeLocalAppointment});

  } catch (error) {
    return response.status(400).json({error})
  }
});


typeLocalRoutes.get("/numTypeLocal", async (request, response) => {
  try {

      const typeLocalRepository = getRepository(TypeLocals);
      const typeLocal = await typeLocalRepository.createQueryBuilder("tl")
      .orderBy("tl.typeLocal_id", "DESC")
      .where("tl.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeLocal);
  } catch (error) {
      return response.status(400).json({ error })
  }
})

export {typeLocalRoutes};
