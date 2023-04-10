import { ICreateUserDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../entities/User";


interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  save(data: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export {IUsersRepository};
