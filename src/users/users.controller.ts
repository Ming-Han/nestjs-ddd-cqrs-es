import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreateUserDTO } from './applications/commands/handlers/createUser/createUser.dto';
import { GetUserDTO } from './applications/queries/handlers/getUser/getUser.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './applications/commands/impl/createUser.command';
import { GetUserQuery } from './applications/queries/impl/getUser.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/create')
  async create(@Body() createUserDTO: CreateUserDTO) {
    // Excute the use case of the createUser
    return this.commandBus.execute(new CreateUserCommand(createUserDTO));
    // return this.createUserUseCase.execute(createUserDTO);
  }

  @Get(':username')
  async findOne(@Param() getUserDTO: GetUserDTO) {
    // Excute the use case of the getUser
    return this.queryBus.execute(new GetUserQuery(getUserDTO));
    // return this.getUserUseCase.execute(getUserDTO);
    // return id;
  }
}
