import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

    async execute ({
      name,
      username,
      email,
      password,
      driver_license,
    }: ICreateUserDTO): Promise<void> {

      const userAlreadyExists = await this.usersRepository.findByEmail(email);
      if(userAlreadyExists){
        throw new AppError("User already exists");
      }

      const passwordHash = await hash(password,8);

      await this.usersRepository.create({
        name,
        username,
        email,
        password : passwordHash,
        driver_license,
    });
  }
}

export {CreateUserUseCase};
