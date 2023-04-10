import {Router} from 'express';
import { CreateAppointmenteController } from '../modules/appointmente/useCases/Appointmente/createAppointmente/CreateAppointmenteController';
import { ListAppointmenteController } from '../modules/appointmente/useCases/Appointmente/listAppointmente/ListAppointmenteController';
import multer from 'multer';
import { ImportAppointmenteController } from '../modules/appointmente/useCases/Appointmente/importAppointmente/ImportAppointmenteController';
import { getRepository } from 'typeorm';
import {Appointments} from "../modules/appointmente/entities/Appointments";
import { UpdateAppointmenteController } from '../modules/appointmente/useCases/Appointmente/updateAppointmente/updateAppointmenteController';
import { NotConforms } from '../modules/appointmente/entities/NotConforms';
import { TypeImages } from '../modules/instrument/entities/TypeImages';
import { TypeAppointmente } from '../modules/appointmente/entities/TypeAppointmente';
import { TypeDefects } from '../modules/appointmente/entities/TypeDefects';
import { ClassificationDefects } from '../modules/appointmente/entities/ClassificationDefects';
import { TypeDispositions } from '../modules/appointmente/entities/TypeDisposition';

const appointmenteRoutes = Router ();
const upload = multer({
  dest: "./tmp",
});

const createAppointmenteController = new CreateAppointmenteController();
const importAppointmenteController = new ImportAppointmenteController();
const listAppointmenteController = new ListAppointmenteController();
const updateAppointmenteController = new UpdateAppointmenteController();

appointmenteRoutes.post("/", createAppointmenteController.handle);

appointmenteRoutes.get("/",listAppointmenteController.handle);

appointmenteRoutes.put("/edit",updateAppointmenteController.handle);

appointmenteRoutes.post("/import", upload.single("file"), importAppointmenteController.handle);

appointmenteRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const appointmenteRepository = getRepository(Appointments)
    const appointmente = await appointmenteRepository.createQueryBuilder("ap")
    .select(["ap.id", "ap.docNum","ap.status","ap.op","ap.nota","ap.bch","ap.feedstock","ap.partNumber","ap.client","ap.address","ap.descriptionInspection","ap.firstInspection","ap.quantityTotal","ap.quantityApproved","ap.quantityRejected","ap.provider", "ap.create_user", "ap.created_at", "nc.notConform_id", "nc.defectClassification", "nc.problemDescription",
    "nc.causativeProcess ", "nc.defectType ","nc.detectedSpot","nc.quantityDefect", "nc.indicator","nc.program","nc.responsibleOperator","nc.shift","nc.potentialCause", "nc.obsPotentialCause", "nc.actionAccept","nc.actionRework","nc.actionScrap","nc.indicatorScrap", "nc.detour","nc.note","nc.scrapDate","nc.unitaryValue","nc.amount","nc.unitWeight","nc.totalWeight", "nc.rncTerminated","nc.workInstruction","nc.operatorFollowedInstruction","nc.trainedOperator","nc.machineProblem","nc.tooling","nc.inherentDefect","nc.appointmente_id","nc.disposition",])
    .leftJoin(NotConforms,"nc","nc.appointmente_id = ap.id")
    .where("ap.id = :id", {id})
    .getRawMany();

    const typeAppointmentImage = await appointmenteRepository.createQueryBuilder("app")
    .select(["app.id", "img.typeImages_id", "img.image_url", "img.selected", "img.cancel"])
    .leftJoin(TypeImages, "img", "img.id_appointment = app.id")
    .where("app.id = :id", {id})
    .andWhere("img.cancel = 'N'")
    .getRawMany();

    const typeAppointmentImagePDF = await appointmenteRepository.createQueryBuilder("app")
    .select(["app.id", "img.typeImages_id", "img.image_url", "img.selected", "img.cancel"])
    .leftJoin(TypeImages, "img", "img.id_appointment = app.id")
    .where("app.id = :id", {id})
    .andWhere("img.selected = 'Y'")
    .andWhere("img.cancel = 'N'")
    .getRawMany();

    return response.json({appointmente, typeAppointmentImage, typeAppointmentImagePDF});

  } catch (error) {
    console.log(error);
  }
})

appointmenteRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const appointmenteRepository = getRepository(Appointments)

    const appointmente = await appointmenteRepository.createQueryBuilder("ap")
    .where("ap.id = :id", {id})
    .getOne();

    const appointmenteCancel = {
      ...appointmente,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await appointmenteRepository.save(appointmenteCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

appointmenteRoutes.put("/updateStatus", async (request, response) => {
  try {
    const {id} = request.body;
    const appointmenteRepository = getRepository(Appointments)

    const appointmente = await appointmenteRepository.createQueryBuilder("ap")
    .where("ap.id = :id", {id})
    .getOne();

    const appointmenteCancel = {
      ...appointmente,
      status: "Finalizado",
      rncTerminated: "Y"

    }
    await appointmenteRepository.save(appointmenteCancel);
    return response.send("Finalizado");

  } catch (error) {
    return response.status(400).json({error})
  }
});

appointmenteRoutes.get("/list/active", async (request, response) => {
  try {
    const appointmenteRepository = getRepository(Appointments)

    const appointmente = await appointmenteRepository.createQueryBuilder("ap")
    .select(["ap.id","ap.docNum", "ap.op","ap.created_at","ap.status","ap.partNumber","ap.address","ap.quantityApproved","ap.quantityRejected", "ap.create_user", "nc.notConform_id"])
    .leftJoin(NotConforms,"nc","nc.appointmente_id = ap.id")
    .orderBy("ap.status", "ASC")
    .addOrderBy("ap.docNum", "DESC")
    .where("ap.cancel = 'N'")
    .getRawMany()

    return response.json(appointmente);

  } catch (error) {
    return response.status(400).json({error})
  }
});

appointmenteRoutes.get("/list/geral", async (request, response) => {
  try {
    const appointmenteRepository = getRepository(Appointments)

    const appointmente = await appointmenteRepository.find()

    return response.json(appointmente);

  } catch (error) {
    return response.status(400).json({error})
  }
});

appointmenteRoutes.get("/numAppointmente", async (request, response) => {
  try {

      const appointmenteRepository = getRepository(Appointments);
      const appointmente = await appointmenteRepository.createQueryBuilder("ap")
      .orderBy("ap.id", "DESC")
      .where("ap.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(appointmente);
  } catch (error) {
      return response.status(400).json({ error })
  }
})

appointmenteRoutes.post("/report", async (request, response) =>{
  try {
    const {time} = request.body;
    const timeSplit = time.split("-");
    const yearBegin = timeSplit[0];
    const monthBegin = timeSplit[1];

    const appointmenteRepository = getRepository(Appointments);
    const appointmente = await appointmenteRepository.createQueryBuilder("ap")
    .select(["ap.id", "ap.docNum", "ap.created_at", "ap.address", "ap.create_user", "ap.descriptionInspection", "ap.firstInspection", "ap.op", "ap.partNumber", "ap.client", "ap.provider", "ap.quantityApproved", "ap.quantityRejected", "nc.problemDescription", "nc.responsibleOperator", "nc.shift", "nc.defectClassification", "td.description", "nc.detectedSpot", "nc.causativeProcess", "nc.potentialCause", "nc.quantityDefect", "nc.indicator", "nc.scrapDate", "nc.unitaryValue", "nc.amount", "nc.unitWeight", "nc.totalWeight", "nc.disposition", "cd.level",])
    .leftJoin(NotConforms, "nc", "nc.appointmente_id = ap.id")
    .leftJoin(TypeDefects, "td", "td.description = nc.defectType")
    .leftJoin(ClassificationDefects, "cd", "cd.description = nc.defectClassification")
    .orderBy("ap.id", "ASC")
    .where("ap.cancel = 'N'")
    .andWhere(" date_part('year', ap.created_at ) = :yearBegin", { yearBegin })
    .andWhere(" date_part('month', ap.created_at ) = :monthBegin", { monthBegin })
    .getRawMany()

    return response.json(appointmente);

  } catch (error) {
    return response.status(400).json({ error })
  }
})

appointmenteRoutes.post("/report/dputapi", async (request, response) =>{
  try {
    const {time} = request.body;
    const timeSplit = time.split("-");
    const yearBegin = timeSplit[0];
    const monthBegin = timeSplit[1];

    const appointmenteRepository = getRepository(Appointments);
    const appointmente = await appointmenteRepository.createQueryBuilder("ap")
    .select(["ap.id", "ap.created_at", "ap.address", "ap.firstInspection", "ap.quantityApproved", "ap.quantityRejected", "ap.quantityTotal", "nc.quantityDefect", "nc.defectType"])
    .innerJoin(NotConforms, "nc", "nc.appointmente_id = ap.id")
    .leftJoin(TypeDefects, "td", "td.description = nc.defectType")
    .orderBy("ap.id", "ASC")
    .where("ap.cancel = 'N'")
    .andWhere(" date_part('year', ap.created_at ) = :yearBegin", { yearBegin })
    .andWhere(" date_part('month', ap.created_at ) = :monthBegin", { monthBegin })
    .getRawMany()

    return response.json(appointmente);

  } catch (error) {
    return response.status(400).json({ error })
  }
})

appointmenteRoutes.get("/rnc/:num",  async (request, response) => {
  try {
    const {num} = request.params;
    const appointmenteRepository = getRepository(Appointments)
    const appointmente = await appointmenteRepository.createQueryBuilder("ap")
    .select(["ap.id", "ap.docNum", "ap.partNumber", "ap.client", "nc.defectClassification", "nc.causativeProcess", "ap.quantityRejected", "ap.created_at", "ap.cancel", "nc.notConform_id", "nc.rncTerminated",])
    .leftJoin(NotConforms,"nc","nc.appointmente_id = ap.id")
    .where("ap.docNum = :num", {num})
    .andWhere("ap.cancel = 'N'")
    .getRawMany();

    return response.json({appointmente});

  } catch (error) {
    console.log(error);
  }
})

export {appointmenteRoutes};

