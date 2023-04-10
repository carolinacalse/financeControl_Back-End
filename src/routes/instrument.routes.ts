import {Router} from 'express';
import { getRepository } from 'typeorm';
import { Criterions } from '../modules/instrument/entities/Criterions';
import { TypeCriterions } from '../modules/instrument/entities/TypeCriterion';
import { Instruments } from '../modules/instrument/entities/Instruments';
import { TypeRangeUses } from '../modules/instrument/entities/TypeRangeUses';
import { TypeResolutions} from '../modules/instrument/entities/TypeResolution';
import { CreateInstrumentController } from '../modules/instrument/useCases/Instrument/createInstrument/createInstrumentController';
import { ListInstrumentController } from '../modules/instrument/useCases/Instrument/listInstrument/ListInstrumentController';
import { UpdateInstrumentController } from '../modules/instrument/useCases/Instrument/updateInstrument/updateInstrumentController';
import { TypeCalibrations } from '../modules/instrument/entities/TypeCalibration';
import { TypeCalibrationCriterions } from '../modules/instrument/entities/TypeCalibrationCriterion';

const instrumentRoutes = Router ();

const createInstrumentController = new CreateInstrumentController();
const listInstrumentController = new ListInstrumentController();
const updateInstrumentController = new UpdateInstrumentController();

instrumentRoutes.post("/", createInstrumentController.handle);

instrumentRoutes.get("/",listInstrumentController.handle);

instrumentRoutes.put("/edit",updateInstrumentController.handle);

instrumentRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const instrumentRepository = getRepository(Instruments)
    const instrument = await instrumentRepository.createQueryBuilder("in")
    .select(['in.id_instrument, in.docNum, in.frequency, in.inactive, in.itemCodePurchase, in.itemCodeService, in.localization, in.note, in.responsible, in.status, in.description, in.acquisition, cr.typeResolution_id, cr.typeRangeUse_id, cr.typeCriterion_id, cr.id_instrument, cr.criterion_id'])
    .leftJoinAndSelect(Criterions,"cr","cr.id_instrument = in.id_instrument")
    .where("in.id_instrument = :id", {id})
    .getRawMany();

    return response.json(instrument);

  } catch (error) {
    return response.status(400).json({error})
  }
})

instrumentRoutes.get("/viewCalibration/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const instrumentRepository = getRepository(Instruments)
    const instrument = await instrumentRepository.createQueryBuilder("in")
    .select(['in.docNum, in.description as item, in.frequency, tc.description, tc.value, tru.minimum, tru.maximum, tr.description as resolution_description, cr.criterion_id '])
    .leftJoin(Criterions,"cr","cr.id_instrument = in.id_instrument")
    .leftJoin(TypeCriterions,"tc", "tc.typeCriterion_id = cr.typeCriterion_id")
    .leftJoin(TypeResolutions, "tr", "tr.typeResolution_id = cr.typeResolution_id ")
    .leftJoin(TypeRangeUses, "tru", "tru.typeRangeUse_id = cr.typeRangeUse_id ")
    .where("in.id_instrument = :id", {id})
    .getRawMany();

    return response.json(instrument);

  } catch (error) {
    return response.status(400).json({error})
  }
})

instrumentRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const instrumentRepository = getRepository(Instruments)

    const instrument = await instrumentRepository.createQueryBuilder("in")
    .where("in.id_instrument = :id", {id})
    .getOne();

    const instrumentCancel = {
      ...instrument,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await instrumentRepository.save(instrumentCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

instrumentRoutes.get("/list/active", async (request, response) => {
  try {
    const instrumentRepository = getRepository(Instruments)

    const instrument = await instrumentRepository.createQueryBuilder("in")
    .where("in.cancel = 'N'")
    .orderBy("in.docNum", "DESC")
    .getRawMany()

    return response.json(instrument);

  } catch (error) {
    return response.status(400).json({error})
  }
});

instrumentRoutes.get("/list/select", async (request, response) => {
  try {
    const instrumentRepository = getRepository(Instruments)

    const instrument = await instrumentRepository.createQueryBuilder("in")
    .where("in.cancel = 'N'")
    .orderBy("in.docNum", "ASC")
    .getRawMany()

    return response.json(instrument);

  } catch (error) {
    return response.status(400).json({error})
  }
});

instrumentRoutes.get("/list/geral", async (request, response) => {
  try {
    const instrumentRepository = getRepository(Instruments)

    const instrument = await instrumentRepository.find()

    return response.json(instrument);

  } catch (error) {
    return response.status(400).json({error})
  }
});

instrumentRoutes.get("/numInstrument", async (request, response) => {
  try {

      const instrumentRepository = getRepository(Instruments);
      const instrument = await instrumentRepository.createQueryBuilder("in")
      .orderBy("in.id_instrument", "DESC")
      .where("in.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(instrument);
  } catch (error) {
      return response.status(400).json({ error })
  }
})

instrumentRoutes.get("/list/item",  async (request, response) => {
  try {
    const instrumentRepository = getRepository(Instruments)
    const instrument = await instrumentRepository.createQueryBuilder("in")
    .select(['*'])
    .leftJoin(TypeCalibrations, "tcc", "tcc.id_instrument = in.id_instrument")
    .leftJoin(TypeCalibrationCriterions, "cc", "cc.typeCalibration_id = tcc.typeCalibration_id")
    .where("in.cancel = 'N'")
    .orderBy("in.docNum", "ASC")
    .getRawMany();

    return response.json(instrument);

  } catch (error) {
    return response.status(400).json({error})
  }
})


export {instrumentRoutes};


