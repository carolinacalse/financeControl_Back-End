import { Router } from "express";
import { getRepository } from "typeorm";
import { ClassificationDefects } from "../modules/appointmente/entities/ClassificationDefects";
import { CreateClassificationDefectController } from "../modules/appointmente/useCases/ClassificationDefect/createClassificationDefect/CreateClassificationDefectController";
import { ListClassificationDefectController } from "../modules/appointmente/useCases/ClassificationDefect/listClassificationDefect/ListClassificationDefectController";
import { UpdateClassificationDefectController } from "../modules/appointmente/useCases/ClassificationDefect/updateClassificationDefect/updateClassificationDefectController";

const classificationDefectRoutes = Router ();

const createClassificationDefectController = new CreateClassificationDefectController();
const listClassificationDefectController = new ListClassificationDefectController();
const updateClassificationDefectController = new UpdateClassificationDefectController();


classificationDefectRoutes.post("/", createClassificationDefectController.handle);

classificationDefectRoutes.get("/",listClassificationDefectController.handle);

classificationDefectRoutes.put("/edit",updateClassificationDefectController.handle);

classificationDefectRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const classificationDefectRepository = getRepository(ClassificationDefects)
    const classificationDefect = await classificationDefectRepository.createQueryBuilder("cd")
    .where("cd.classificationDefect_id = :id", {id})
    .getOne();

    return response.json(classificationDefect);

  } catch (error) {

  }
})

classificationDefectRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const classificationDefectRepository = getRepository(ClassificationDefects)

    const classificationDefect = await classificationDefectRepository.createQueryBuilder("cd")
    .where("cd.classificationDefect_id = :id", {id})
    .getOne();

    const classificationDefectCancel = {
      ...classificationDefect,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await classificationDefectRepository.save(classificationDefectCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

classificationDefectRoutes.get("/list/active", async (request, response) => {
  try {
    const classificationDefectRepository = getRepository(ClassificationDefects)

    const classificationDefect = await classificationDefectRepository.createQueryBuilder("cd")
    .orderBy("cd.docNum", "DESC")
    .where("cd.cancel = 'N'")
    .getRawMany()

    return response.json(classificationDefect);

  } catch (error) {
    return response.status(400).json({error})
  }
});

classificationDefectRoutes.get("/numClassificationDefect", async (request, response) => {
  try {

      const classificationDefectRepository = getRepository(ClassificationDefects);
      const classificationDefect = await classificationDefectRepository.createQueryBuilder("cd")
      .orderBy("cd.classificationDefect_id", "DESC")
      .where("cd.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(classificationDefect);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {classificationDefectRoutes};
