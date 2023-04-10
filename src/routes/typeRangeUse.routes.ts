import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeRangeUses } from "../modules/instrument/entities/TypeRangeUses";
import { CreateTypeRangeUseController } from "../modules/instrument/useCases/TypeRangeUse/createTypeRangeUse/createTypeRangeUseController";
import { ListTypeRangeUseController } from "../modules/instrument/useCases/TypeRangeUse/listTypeRangeUse/ListTypeRangeUseController";
import { UpdateTypeRangeUseController } from "../modules/instrument/useCases/TypeRangeUse/updateTypeRangeUse/updateTypeRangeUseController";

const typeRangeUseRoutes = Router ();

const createTypeRangeUseController = new CreateTypeRangeUseController();
const listTypeRangeUseController = new ListTypeRangeUseController();
const updateTypeRangeUseController = new UpdateTypeRangeUseController();


typeRangeUseRoutes.post("/", createTypeRangeUseController.handle);

typeRangeUseRoutes.get("/",listTypeRangeUseController.handle);

typeRangeUseRoutes.put("/edit",updateTypeRangeUseController.handle);

typeRangeUseRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeRangeUseRepository = getRepository(TypeRangeUses)
    const typeRangeUse = await typeRangeUseRepository.createQueryBuilder("tru")
    .where("tru.typeRangeUse_id = :id", {id})
    .getOne();

    return response.json(typeRangeUse);

  } catch (error) {

  }
})

typeRangeUseRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeRangeUseRepository = getRepository(TypeRangeUses)

    const typeRangeUse = await typeRangeUseRepository.createQueryBuilder("tru")
    .where("tru.typeRangeUse_id = :id", {id})
    .getOne();

    const typeRangeUseCancel = {
      ...typeRangeUse,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeRangeUseRepository.save(typeRangeUseCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeRangeUseRoutes.get("/list/active", async (request, response) => {
  try {
    const typeRangeUseRepository = getRepository(TypeRangeUses)

    const typeRangeUse = await typeRangeUseRepository.createQueryBuilder("tru")
    .orderBy("tru.docNum", "DESC")
    .where("tru.cancel = 'N'")
    .getRawMany()

    return response.json(typeRangeUse);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeRangeUseRoutes.get("/numTypeRangeUse", async (request, response) => {
  try {

      const typeRangeUseRepository = getRepository(TypeRangeUses);
      const typeRangeUse = await typeRangeUseRepository.createQueryBuilder("tru")
      .orderBy("tru.typeRangeUse_id", "DESC")
      .where("tru.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeRangeUse);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeRangeUseRoutes};
