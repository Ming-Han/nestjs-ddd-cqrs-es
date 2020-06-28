import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { GetUserQuery } from '../../impl/getUser.query';
import { UserRepo } from 'src/users/repos/impl/userRepo.repo';
import { UserName } from 'src/users/domain/userName.valueObject';
import { HttpStatus, HttpException } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private userRepo: UserRepo) {}

  async execute(query: GetUserQuery): Promise<any> {
    console.log(clc.cyanBright('GetUserQuery...'));
    const { getUserDTO: dto } = query;
    const [username, usernameError] = UserName.create({ name: dto.username });
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
