import { TypeAppointmente } from "../../entities/TypeAppointmente";

interface ICreateTypeAppointmenteDTO {
  typeAppointmente_id: number;
  docNum: number;
  description: string;
  inactive: string;
}

interface ITypeAppointmenteRepository {
  findByName(typeAppointmente_id: number): Promise<TypeAppointmente>;
  findOne({ where: { typeAppointmente_id } }: { where: { typeAppointmente_id: any } }): Promise<TypeAppointmente>;
  list(): Promise<TypeAppointmente[]>;
  save(typeAppointmente : ICreateTypeAppointmenteDTO): Promise<TypeAppointmente>;
  create ({docNum, description, }: ICreateTypeAppointmenteDTO) : Promise<void>;

}
export {ITypeAppointmenteRepository, ICreateTypeAppointmenteDTO};
