import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { CreateUserCommand } from '../../impl/createUser.command';
import * as CreateUserErrors from './createUser.errors';
import { UserRepo } from 'src/users/repos/impl/userRepo.repo';
import { UserName } from 'src/users/domain/userName.valueObject';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/domain/user.root';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand) {
    console.log(clc.cyanBright('CreateUserCommand...'));

    const { createUserDTO: dto } = command;

    const [username, usernameError] = UserName.create({ name: dto.username });
    if (usernameError) {
      throw new HttpException(
        usernameError.message,
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

    const UserClass = this.publisher.mergeClassContext(User);

    const [user, userError] = UserClass.create({ username });

    if (userError) {
      throw new HttpException(
        userError.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const [, error] = await this.userRepo.save(user);

    if (error) {
      return new CreateUserErrors.GeneralError(error.message).throw();
    }

    user.commit();
  }
}
