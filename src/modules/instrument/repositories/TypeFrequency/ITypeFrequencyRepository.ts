import { TypeFrequencys } from "../../entities/TypeFrequencys";

interface ICreateTypeFrequencysDTO {
  typeFrequency_id?: number;
  docNum: number;
  description: string;
  inactive?: string;
}

interface ITypeFrequencyRepository {
  findByName(typeFrequency_id: number): Promise<TypeFrequencys>;
  findOne({ where: { typeFrequency_id } }: { where: { typeFrequency_id: any } }): Promise<TypeFrequencys>;
  list(): Promise<TypeFrequencys[]>;
  save(typeFrequency : ICreateTypeFrequencysDTO): Promise<TypeFrequencys>;
  /* update (typeFrequency_id,description, inactive): Promise<TypeFrequencys>; */
  create ({docNum, description, }: ICreateTypeFrequencysDTO) : Promise<void>;

}
export {ITypeFrequencyRepository, ICreateTypeFrequencysDTO};
