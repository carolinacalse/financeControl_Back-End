import { Router } from "express";
import { getRepository } from "typeorm";
import { ProcessAlert } from "../modules/instrument/entities/ProcessAlert";
import { TypeAlerts } from "../modules/instrument/entities/TypeAlert";
import { TypeImages } from "../modules/instrument/entities/TypeImages";
import { CreateTypeAlertController } from "../modules/instrument/useCases/TypeAlert/createTypeAlert/createTypeAlertController";
import { ListTypeAlertController } from "../modules/instrument/useCases/TypeAlert/listTypeAlert/ListTypeAlertController";
import { UpdateTypeAlertController } from "../modules/instrument/useCases/TypeAlert/updateTypeAlert/updateTypeAlertController";

const typeAlertRoutes = Router ();

const createTypeAlertController = new CreateTypeAlertController();
const listTypeAlertController = new ListTypeAlertController();
const updateTypeAlertController = new UpdateTypeAlertController();


typeAlertRoutes.post("/", createTypeAlertController.handle);

typeAlertRoutes.get("/",listTypeAlertController.handle);

typeAlertRoutes.put("/edit",updateTypeAlertController.handle);

typeAlertRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeAlertRepository = getRepository(TypeAlerts)

    const typeAlert = await typeAlertRepository.createQueryBuilder("ta")
    .select(["ta.typeAlert_id", "ta.docNum", "ta.partNumber", "ta.type", "ta.inactive", "ta.cancel", "proc.process", "proc.process_alert_id", "proc.cancel"])
    .leftJoin(ProcessAlert, "proc", "proc.typeAlert_id = ta.typeAlert_id")
    .where("ta.typeAlert_id = :id", {id})
    .andWhere("proc.cancel = 'N'")
    .getRawMany();

    const alertImage = await typeAlertRepository.createQueryBuilder("alert")
    .select(["alert.typeAlert_id", "img.typeImages_id", "img.image_url", "img.cancel"])
    .leftJoin(TypeImages, "img", "img.typealert_id = alert.typeAlert_id")
    .where("alert.typeAlert_id = :id", {id})
    .andWhere("img.cancel = 'N'")
    .getRawMany();

    return response.json({typeAlert, alertImage});

  } catch (error) {
    console.log(error);
  }
})

typeAlertRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeAlertRepository = getRepository(TypeAlerts)

    const typeAlert = await typeAlertRepository.createQueryBuilder("ta")
    .where("ta.typeAlert_id = :id", {id})
    .getOne();

    const typeAlertCancel = {
      ...typeAlert,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeAlertRepository.save(typeAlertCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeAlertRoutes.get("/list/active", async (request, response) => {
  try {
    const typeAlertRepository = getRepository(TypeAlerts)

    const typeAlert = await typeAlertRepository.createQueryBuilder("ta")
    .select(["ta.typeAlert_id", "ta.docNum", "ta.partNumber", "ta.type", "ta.inactive", "ta.cancel", "proc.process", "proc.process_alert_id", "proc.cancel"])
    .leftJoin(ProcessAlert, "proc", "proc.typeAlert_id = ta.typeAlert_id")
    .orderBy("ta.docNum", "DESC")
    .where("ta.cancel = 'N'")
    .andWhere("proc.cancel = 'N'")
    .getRawMany()

    return response.json(typeAlert);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeAlertRoutes.get("/numTypeAlert", async (request, response) => {
  try {

      const typeAlertRepository = getRepository(TypeAlerts);
      const typeAlert = await typeAlertRepository.createQueryBuilder("ta")
      .orderBy("ta.typeAlert_id", "DESC")
      .where("ta.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeAlert);
  } catch (error) {
      return response.status(400).json({ error })
  }
})

typeAlertRoutes.get("/listAlert", async (request, response) => {
  try {
    const typeAlertRepository = getRepository(ProcessAlert)

    const typeAlert = await typeAlertRepository.createQueryBuilder("ta")
    .orderBy("ta.process_alert_id", "DESC")
    .where("ta.cancel = 'N'")
    .getRawMany()

    return response.json(typeAlert);

  } catch (error) {
    return response.status(400).json({error})
  }
});


export {typeAlertRoutes};
