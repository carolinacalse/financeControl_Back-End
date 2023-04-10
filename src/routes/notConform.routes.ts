import {Router} from 'express';
import { getRepository } from "typeorm";
import { CreateNotConformController } from '../modules/appointmente/useCases/NotConform/createNotConform/CreateNotConformController';
import { ListNotConformController } from '../modules/appointmente/useCases/NotConform/listNotConform/ListNotConformController';
import { UpdateNotConformController } from '../modules/appointmente/useCases/NotConform/updateNotConform/updateNotConformController';
import { NotConforms } from '../modules/appointmente/entities/NotConforms';
import { Appointments } from '../modules/appointmente/entities/Appointments';
import { TypeDefects } from '../modules/appointmente/entities/TypeDefects';
import { ClassificationDefects } from '../modules/appointmente/entities/ClassificationDefects';
import { TypeImages } from '../modules/instrument/entities/TypeImages';

const notConformRoutes = Router ();

const createNotConformController = new CreateNotConformController();
const listNotConformController = new ListNotConformController();
const updateNotConformController = new UpdateNotConformController();

notConformRoutes.post("/", createNotConformController.handle);

notConformRoutes.get("/",listNotConformController.handle);

notConformRoutes.put("/edit",updateNotConformController.handle);

notConformRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const notConformRepository = getRepository(NotConforms)
    const notConform = await notConformRepository.createQueryBuilder("nc")
    .where("nc.notConform_id = :id", {id})
    .getOne();

    return response.json(notConform);

  } catch (error) {
    console.log(error);
  }
})

notConformRoutes.put("/cancel", async (request, response) => {
  try {
    const {id} = request.body;
    const notConformRepository = getRepository(NotConforms)

    const notConform = await notConformRepository.createQueryBuilder("nc")
    .where("nc.notConform_id = :id", {id})
    .getOne();

    const notConformCancel = {
      ...notConform,
      cancel_date: new Date(),
      cancel_user: "Carolina",
      cancel: "Y"
    }
    await notConformRepository.save(notConformCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

notConformRoutes.get("/list/active", async (request, response) => {
  try {
    const notConformRepository = getRepository(NotConforms)

    const notConform = await notConformRepository.createQueryBuilder("nc")
    .where("nc.cancel = 'N'")
    .getRawMany()

    return response.json(notConform);

  } catch (error) {
    return response.status(400).json({error})
  }
});

notConformRoutes.post("/report", async (request, response) =>{
  try {
    const {time} = request.body;
    const timeSplit = time.split("-");
    const yearBegin = timeSplit[0];
    const monthBegin = timeSplit[1];

    const appointmenteRepository = getRepository(NotConforms);
    const appointmente = await appointmenteRepository.createQueryBuilder("nc")
    .select(["ap.id", "ap.docNum", "ap.created_at", "ap.address", "ap.create_user", "ap.descriptionInspection", "ap.firstInspection", "ap.op", "ap.partNumber", "ap.client", "ap.provider", "ap.quantityApproved", "ap.quantityRejected", "ap.quantityTotal", "nc.problemDescription", "nc.program", "nc.responsibleOperator", "nc.shift", "nc.defectClassification", "nc.potentialCause", "nc.obsPotentialCause", "td.description", "nc.detectedSpot", "nc.causativeProcess", "nc.quantityDefect", "nc.indicator", "nc.scrapDate", "nc.unitaryValue", "nc.amount", "nc.unitWeight", "nc.totalWeight", "nc.disposition", "nc.potentialCause", "cd.level",])
    .leftJoin(Appointments, "ap", "ap.id = nc.appointmente_id")
    .leftJoin(TypeDefects, "td", "td.description = nc.defectType")
    .leftJoin(ClassificationDefects, "cd", "cd.description = nc.defectClassification")
    .orderBy("ap.id", "DESC")
    .where("ap.cancel = 'N'")
    .andWhere(" date_part('year', ap.created_at ) = :yearBegin", { yearBegin })
    .andWhere(" date_part('month', ap.created_at ) = :monthBegin", { monthBegin })
    .getRawMany()

    const imageRepository = getRepository(TypeImages);
    const typeAppointmentImage = await imageRepository.createQueryBuilder("img")
    .select(["img.typeImages_id", "img.id_appointment", "img.image_url", "img.cancel"])
    .where("img.cancel = 'N'")
    .getRawMany();

    const typeAppointmentImagePDF = await imageRepository.createQueryBuilder("img")
    .select(["img.typeImages_id", "img.id_appointment", "img.image_url", "img.selected", "img.cancel"])
    .where("img.cancel = 'N'")
    .andWhere("img.selected = 'Y'")
    .getRawMany();
    
    return response.json({appointmente, typeAppointmentImage, typeAppointmentImagePDF});

  } catch (error) {
    return response.status(400).json({ error })
  }
})

export {notConformRoutes};

