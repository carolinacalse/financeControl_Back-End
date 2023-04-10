import { Router } from "express";
import { getRepository } from "typeorm";
import { ProcessAlert } from "../modules/instrument/entities/ProcessAlert";

const processAlertRoutes = Router ();

processAlertRoutes.post("/new", async (request, response) => {
    try {
      const {id, process} = request.body;
      const typeAlertRepository = getRepository(ProcessAlert)

      const typeAlert = {
        typeAlert_id: id,
        process: process,
      }
      const novo = await typeAlertRepository.save(typeAlert);
      return response.status(200).json({novo})

    } catch (error) {
      return response.status(400).json({error})
    }
  });

processAlertRoutes.put("/cancel", async (request, response) => {
    try {
      const {id} = request.body;
      const typeAlertRepository = getRepository(ProcessAlert)

      const processAlert = await typeAlertRepository.createQueryBuilder("pa")
      .where("pa.process_alert_id = :id", {id})
      .getOne();

      const typeAlertCancel = {
        ...processAlert,
        cancel_date: new Date(),
        cancel_user: "",
        cancel: "Y"
      }
      const cancelado = await typeAlertRepository.save(typeAlertCancel);
      return response.status(200).json({cancelado})

    } catch (error) {
      return response.status(400).json({error})
    }
  });

  export {processAlertRoutes};
