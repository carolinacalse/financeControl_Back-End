import { Router } from "express";
import { getRepository, getConnection } from "typeorm";
import { TypeCalibrations } from "../modules/instrument/entities/TypeCalibration";

const reportRoutes = Router ();

reportRoutes.get("/", async (request, response) => {
    try {
        const calibrationRepository = getRepository(TypeCalibrations);

        const report_instrument = await getConnection().query(`select distinct on ( qtc.item ) qtc.item ,
        qtc."typeCalibration_id" as "cal_typeCalibration_id",
        qtc."docNum" as "cal_docNum",
        qtc.type as cal_type,
        qtc.id_model as cal_id_model,
        qtc.id_instrument as  cal_id_instrument,
        qtc.id_device as cal_id_device,
        qtc."finalReport" as "cal_finalReport",
        qtc."nextCalibration" as "cal_nextCalibration",
        qtc.provider as cal_provider,
        qtc.inactive as cal_inactive,
        qtc."dateCalibration" as "cal_dateCalibration",
        qi.description as in_description,
        qi.responsible as in_responsible,
        qi."docNum" as "in_docNum",
        qi.id_instrument as in_id_instrument,
        qi."docNum" as "in_docNum",
        qi.localization as in_localization,
        qi.frequency as in_frequency,
        tm."docNum" as "tm_docNum",
        tm.location as tm_location,
        tm.responsible as tm_responsible,
        tm."typeModel_id" as "tm_typeModel_id",
        tm.frequency as tm_frequency,
        td."docNum" as "td_docNum",
        td.location as td_location,
        td."typeDevice_id" as "td_typeDevice_id",
        td.responsible as td_responsible,
        td.frequency as td_frequency,
        tdm.item as tdm_item
        from "financeControl_typeCalibrations" qtc
        left join financeControl_instruments qi on qi.id_instrument = qtc.id_instrument
        left join "financeControl_typeModels" tm on tm."typeModel_id" = qtc.id_model
        left join "financeControl_typeDevices" td on td."typeDevice_id" = qtc.id_device
        left join "financeControl_typeDeviceOrModels" tdm on tdm.model_id = qtc.id_model or qtc.id_device = tdm.device_id
        where qtc.cancel = 'N'
        order by qtc.item , "typeCalibration_id" desc`);

        return response.json(report_instrument);

    } catch (error) {
        return response.status(400).json({ error })
    }
})



export { reportRoutes }
