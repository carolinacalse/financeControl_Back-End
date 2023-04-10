import {Request, Response} from "express";
import { CreateNotConformUseCase } from "./CreateNotConformUseCase";
import {container} from "tsyringe"

class CreateNotConformController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
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
      workInstruction,
      properWorkInstruction,
      operatorFollowedInstruction,
      trainedOperator,
      machineProblem,
      tooling,
      inherentDefect,
      id_file,
      appointmente_id,} = request.body;

    const createNotConformUseCase = container.resolve(CreateNotConformUseCase);

    await createNotConformUseCase.execute({
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
      workInstruction,
      properWorkInstruction,
      operatorFollowedInstruction,
      trainedOperator,
      machineProblem,
      tooling,
      inherentDefect,
      id_file,
      appointmente_id,})
    return response.status(201).send();
  }
}
 export {CreateNotConformController}
