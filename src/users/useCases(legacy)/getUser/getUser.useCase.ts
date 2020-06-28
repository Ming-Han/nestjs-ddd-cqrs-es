import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as clc from 'cli-color';
import { IUseCase } from 'src/core/useCase.interface';
import { UserRepo } from 'src/users/repos/impl/userRepo.repo';
import { GetUserDTO } from './getUser.dto';
import { UserName } from 'src/users/domain/userName.valueObject';

@Injectable()
export class GetUserUseCase implements IUseCase<GetUserDTO, Promise<any>> {
  constructor(private userRepo: UserRepo) {}

  async execute(req: GetUserDTO): Promise<any> {
    console.log(clc.cyanBright('Running GetUserUseCase...'));

    const [username, usernameError] = UserName.create({ name: req.username });
    if (usernameError) {
      throw new HttpException(
        usernameError.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const [user, userError] = await this.userRepo.getUserByUserName(username);
    if (userError) {
      throw new HttpException(
        userError.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      id: user.userId.id.toValue(),
      username: user.username.value,
    };
  }
}
