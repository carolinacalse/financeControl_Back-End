import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { User } from '../../entities/User';
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {
  private repository : Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

 async create({name, username, email, driver_license, password,avatar}: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      driver_license,
      password,
      avatar
    });

    await this.repository.save(user);
  }

  async save(user: User): Promise<void> {

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({email});
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
  async list(): Promise <User[]> {
    const user = await this.repository.find();
    return user;
   }
}

export {UsersRepository}
