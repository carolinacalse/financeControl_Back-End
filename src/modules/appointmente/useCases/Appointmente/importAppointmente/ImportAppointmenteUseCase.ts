import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { IAppointmenteRepository } from "../../../repositories/Appointmente/IAppointmenteRepository";
import {inject, injectable} from "tsyringe"

interface IImportAppointmente {
  docNum: number;
  status: string;
  op : string;
  nota ?: string;
  bch ?: string;
  feedstock ?: string;
  partNumber: string;
  client?: string;
  address?: string;
  descriptionInspection?: string;
  firstInspection?: string;
  quantityTotal?: number;
  quantityApproved?: number;
  quantityRejected?: number;
  provider?: string;
  inactive?: string;
}

@injectable()
class ImportAppointmenteUseCase {
  constructor(
    @inject("AppointmenteRepository")
    private appointmenteRepository: IAppointmenteRepository){}

  loadAppointmente(file: Express.Multer.File): Promise<IImportAppointmente[]> {
   return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file.path);
    const appointmente : IImportAppointmente[] = [];
    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on("data", async (line)=>{
      const [docNum,
        status,
        op ,
        nota ,
        bch ,
        feedstock ,
        partNumber,
        client,
        address,
        descriptionInspection,
        firstInspection,
        quantityTotal,
        quantityApproved,
        quantityRejected,
        provider,
        inactive,] =line;
      appointmente.push({
        docNum,
        status,
        op ,
        nota ,
        bch ,
        feedstock ,
        partNumber,
        client,
        address: address,
        descriptionInspection,
        firstInspection,
        quantityTotal,
        quantityApproved,
        quantityRejected,
        provider,
        inactive,
      });
    })
    .on("end", () => {
      fs.promises.unlink(file.path);
      resolve(appointmente);
    })
    .on("error",(err)=> {
      reject(err);
    });
    });
  }


  async execute(file: Express.Multer.File): Promise<void> {
    const appointmente = await this.loadAppointmente(file);

    appointmente.map(async (appointmente) => {
      const {docNum,
        status,
        op ,
        nota ,
        bch ,
        feedstock ,
        partNumber,
        client,
        address,
        descriptionInspection,
        firstInspection,
        quantityTotal,
        quantityApproved,
        quantityRejected,
        provider,
        inactive,} = appointmente;

      const existAppointmente = await this.appointmenteRepository.findByName(docNum);
      if (!existAppointmente) {
        await this.appointmenteRepository.create({
          docNum,
          status,
          op ,
          nota ,
          bch ,
          feedstock ,
          partNumber,
          client,
          address: address,
          descriptionInspection,
          firstInspection,
          quantityTotal,
          quantityApproved,
          quantityRejected,
          provider,
          inactive,
        });
      }
    });
  }
}
export {ImportAppointmenteUseCase};
