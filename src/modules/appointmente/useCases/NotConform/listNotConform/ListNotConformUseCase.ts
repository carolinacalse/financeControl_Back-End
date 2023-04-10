import { injectable, inject } from "tsyringe";
import { NotConforms } from "../../../entities/NotConforms";
import { INotConformRepository } from "../../../repositories/NotConform/INotConformRepository";

@injectable()
class ListNotConformUseCase {
  constructor(
    @inject("NotConformRepository")
    private notConformRepository: INotConformRepository){}

   async execute() : Promise<NotConforms[]>{
    const notConform = await this.notConformRepository.list();

    return notConform;
  }
}
export {ListNotConformUseCase}
