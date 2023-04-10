import {container} from "tsyringe";
import { UsersRepository } from "../../modules/accounts/repositories/implementation/implementation";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import {IAppointmenteRepository} from "../../modules/appointmente/repositories/Appointmente/IAppointmenteRepository";
import { IClassificationDefectRepository } from "../../modules/appointmente/repositories/ClassificationDefect/IClassificationDefectRepository";
import {AppointmenteRepository} from "../../modules/appointmente/repositories/implementation/Appointmente/AppointmenteRepository"
import { ClassificationDefectRepository } from "../../modules/appointmente/repositories/implementation/ClassificationDefect/ClassificationDefectRepository";
import { NotConformRepository } from "../../modules/appointmente/repositories/implementation/NotConform/NotConformRepository";
import { TypeActionRepository } from "../../modules/appointmente/repositories/implementation/TypeAction/TypeActionRepository";
import { TypeAppointmenteRepository } from "../../modules/appointmente/repositories/implementation/TypeAppointmente/TypeAppointmenteRepository";
import { TypeDefectRepository } from "../../modules/appointmente/repositories/implementation/TypeDefect/TypeDefectRepository";
import { TypeDispositionRepository } from "../../modules/appointmente/repositories/implementation/TypeDisposition/TypeDispositionRepository";
import { TypeLocalRepository } from "../../modules/appointmente/repositories/implementation/TypeLocal/TypeLocalRepository";
import { INotConformRepository } from "../../modules/appointmente/repositories/NotConform/INotConformRepository";
import { ITypeActionRepository } from "../../modules/appointmente/repositories/TypeAction/ITypeActionRepository";
import { ITypeAppointmenteRepository } from "../../modules/appointmente/repositories/TypeAppointmente/ITypeAppointmenteRepository";
import { ITypeDefectRepository } from "../../modules/appointmente/repositories/TypeDefect/ITypeDefectRepository";
import { ITypeDispositionRepository } from "../../modules/appointmente/repositories/TypeDisposition/ITypeDispositionRepository";
import { ITypeLocalRepository } from "../../modules/appointmente/repositories/TypeLocal/ITypeLocalRepository";
import { ICriterionRepository } from "../../modules/instrument/repositories/Criterion/ICriterionRepository";
import { CriterionRepository } from "../../modules/instrument/repositories/implementation/Criterion/CriterionRepository";
import { InstrumentRepository } from "../../modules/instrument/repositories/implementation/Instrument/InstrumentRepository";
import { ProcessAlertRepository } from "../../modules/instrument/repositories/implementation/processAlert/ProcessAlertRepository";
import { TypeAlertRepository } from "../../modules/instrument/repositories/implementation/TypeAlert/TypeAlertRepository";
import { TypeCalibrationRepository } from "../../modules/instrument/repositories/implementation/TypeCalibration/TypeCalibrationRepository";
import { TypeCalibrationCriterionRepository } from "../../modules/instrument/repositories/implementation/TypeCalibrationCriterion/TypeCalibrationCriterionRepository";
import { TypeCriterionRepository } from "../../modules/instrument/repositories/implementation/TypeCriterion/TypeCriterionRepository";
import { TypeDeviceRepository } from "../../modules/instrument/repositories/implementation/TypeDevice/TypeDeviceRepository";
import { TypeDeviceOrModelRepository } from "../../modules/instrument/repositories/implementation/TypeDeviceOrModel/TypeDeviceOrModel";
import { TypeFrequencyRepository } from "../../modules/instrument/repositories/implementation/TypeFrequency/TypeFrequencyRepository";
import { TypeImagesRepository } from "../../modules/instrument/repositories/implementation/TypeImages/TypeImagesRepository";
import { TypeModelRepository } from "../../modules/instrument/repositories/implementation/TypeModel/TypeModelRepository";
import { TypeRangeUseRepository } from "../../modules/instrument/repositories/implementation/TypeRangeUse/TypeRangeUseRepository";
import { TypeResolutionRepository } from "../../modules/instrument/repositories/implementation/TypeResolution/TypeResolutionRepository";
import { IInstrumentRepository } from "../../modules/instrument/repositories/Instrument/IInstrumentRepository";
import { IProcessAlertRepository } from "../../modules/instrument/repositories/processAlert/IProcessAlertRepository";
import { ITypeAlertRepository } from "../../modules/instrument/repositories/TypeAlert/ITypeAlertRepository";
import { ITypeCalibrationRepository } from "../../modules/instrument/repositories/TypeCalibration/ITypeCalibrationRepository";
import { ITypeCalibrationCriterionRepository } from "../../modules/instrument/repositories/TypeCalibrationCriterion/ITypeCalibrationCriterionRepository";
import { ITypeCriterionRepository } from "../../modules/instrument/repositories/TypeCriterion/ITypeCriterionRepository";
import { ITypeDeviceRepository } from "../../modules/instrument/repositories/TypeDevice/ITypeDeviceRepository";
import { ITypeDeviceOrModelRepository } from "../../modules/instrument/repositories/TypeDeviceOrModel/ITypeDeviceOrModelRepository";
import { ITypeFrequencyRepository } from "../../modules/instrument/repositories/TypeFrequency/ITypeFrequencyRepository";
import { ITypeImagesRepository } from "../../modules/instrument/repositories/TypeImages/ITypeImagesRepository";
import { ITypeModelRepository } from "../../modules/instrument/repositories/TypeModel/ITypeModelRepository";
import { ITypeRangeUseRepository } from "../../modules/instrument/repositories/TypeRangeUse/ITypeRangeUseRepository";
import { ITypeResolutionRepository } from "../../modules/instrument/repositories/TypeResolution/ITypeResolutionRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IAppointmenteRepository>(
  "AppointmenteRepository",
  AppointmenteRepository
);

container.registerSingleton<INotConformRepository>(
  "NotConformRepository",
  NotConformRepository
);

container.registerSingleton<ITypeDefectRepository>(
  "TypeDefectRepository",
  TypeDefectRepository
);

container.registerSingleton<ITypeAppointmenteRepository>(
  "TypeAppointmenteRepository",
  TypeAppointmenteRepository
);

container.registerSingleton<ITypeDispositionRepository>(
  "TypeDispositionRepository",
  TypeDispositionRepository
);

container.registerSingleton<ITypeLocalRepository>(
  "TypeLocalRepository",
  TypeLocalRepository
);

container.registerSingleton<IClassificationDefectRepository>(
  "ClassificationDefectRepository",
  ClassificationDefectRepository
);

container.registerSingleton<ITypeFrequencyRepository>(
  "TypeFrequencyRepository",
  TypeFrequencyRepository
);

container.registerSingleton<ITypeCriterionRepository>(
  "TypeCriterionRepository",
  TypeCriterionRepository
);

container.registerSingleton<ITypeResolutionRepository>(
  "TypeResolutionRepository",
  TypeResolutionRepository
);

container.registerSingleton<ITypeRangeUseRepository>(
  "TypeRangeUseRepository",
  TypeRangeUseRepository
);

container.registerSingleton<IInstrumentRepository>(
  "InstrumentRepository",
  InstrumentRepository
);

container.registerSingleton<ICriterionRepository>(
  "CriterionRepository",
  CriterionRepository
);

container.registerSingleton<ITypeModelRepository>(
  "TypeModelRepository",
  TypeModelRepository
);

container.registerSingleton<ITypeDeviceRepository>(
  "TypeDeviceRepository",
  TypeDeviceRepository
);

container.registerSingleton<ITypeCalibrationRepository>(
  "TypeCalibrationRepository",
  TypeCalibrationRepository
);

container.registerSingleton<ITypeAlertRepository>(
  "TypeAlertRepository",
  TypeAlertRepository
);

container.registerSingleton<ITypeActionRepository>(
  "TypeActionRepository",
  TypeActionRepository
);

container.registerSingleton<ITypeDeviceOrModelRepository>(
  "TypeDeviceOrModelRepository",
  TypeDeviceOrModelRepository
);

container.registerSingleton<ITypeImagesRepository>(
  "TypeImagesRepository",
  TypeImagesRepository
);


container.registerSingleton<ITypeCalibrationCriterionRepository>(
  "TypeCalibrationCriterionRepository",
  TypeCalibrationCriterionRepository
);

container.registerSingleton<IProcessAlertRepository>(
  "ProcessAlertRepository",
  ProcessAlertRepository
);
