import {Request, Response} from "express";
import {container} from "tsyringe";
import { UpdateNotConformUseCase } from "./updateNotConformUseCase";

class UpdateNotConformController {

  async handle(request: Request, response: Response): Promise<Response> {

    const {
      notConform_id,
      problemDescription,
      defectClassification,
      causativeProcess,
      defectType ,
      detectedSpot,
      quantityDefect,
      indicator,
      program,
      responsibleOperator,
      shift,
      potentialCause,
      obsPotentialCause,
      actionAccept,
      actionRework,
      actionScrap,
      indicatorScrap,
      detour,
      note,
      scrapDate,
      unitaryValue,
      amount,
      unitWeight,
      totalWeight,
      rncTerminated,
      workInstruction,
      properWorkInstruction,
      operatorFollowedInstruction,
      trainedOperator,
      machineProblem,
      tooling,
      inherentDefect,
      disposition,
      id_file,
    } = request.body;

    try {
    const updateNotConformController= container.resolve(UpdateNotConformUseCase);

    const types_response = await updateNotConformController.execute({
      notConform_id,
      problemDescription,
      defectClassification,
      causativeProcess,
      defectType ,
      detectedSpot,
      quantityDefect,
      indicator,
      program,
      responsibleOperator,
      shift,
      potentialCause,
      obsPotentialCause,
      actionAccept,
      actionRework,
      actionScrap,
      indicatorScrap,
      detour,
      note,
      scrapDate,
      unitaryValue,
      amount,
      unitWeight,
      totalWeight,
      rncTerminated,
      workInstruction,
      properWorkInstruction,
      operatorFollowedInstruction,
      trainedOperator,
      machineProblem,
      tooling,
      inherentDefect,
      disposition,
      id_file,
    });
    return response.status(201).json(types_response);
    }catch (error) {
    return response.status(400).json({error});
    }
  }
}
export {UpdateNotConformController};
