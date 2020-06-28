import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as clc from 'cli-color';
import { IUseCase } from 'src/core/useCase.interface';
import { UserName } from '../../domain/userName.valueObject';
import { User } from '../../domain/user.root';
import * as CreateUserErrors from './createUser.errors';
import { UserRepo } from 'src/users/repos/impl/userRepo.repo';
import { CreateUserDTO } from './createUser.dto';

@Injectable()
export class CreateUserUseCase
  implements IUseCase<CreateUserDTO, Promise<any>> {
  constructor(private userRepo: UserRepo) {}

  async execute(req: CreateUserDTO): Promise<any> {
    console.log(clc.cyanBright('CreateUserCommand...'));

    const [username, usernameError] = UserName.create({ name: req.username });
    if (usernameError) {
      throw new HttpException(
        usernameError.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const [user, userError] = User.create({ username });
    if (userError) {
      throw new HttpException(
        userError.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const [isUserExisted, isUserExistedError] = await this.userRepo.exists(
      username,
    );
    if (isUserExistedError) {
      throw new HttpException(
        isUserExistedError.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (isUserExisted) {
      return new CreateUserErrors.UsernameTakenError(username.value).throw();
    }

    const [, error] = await this.userRepo.save(user);
    if (error) {
      return new CreateUserErrors.GeneralError(error.message).throw();
    }

    console.log(clc.redBright(`UserCreatedEvent...`));

    return;
  }
}
