import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreateUserDTO } from './applications/commands/handlers/createUser/createUser.dto';
import { GetUserReqDTO } from './applications/queries/handlers/getUser/getUserReq.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './applications/commands/impl/createUser.command';
import { GetUserQuery } from './applications/queries/impl/getUser.query';
import { ApiResponse } from '@nestjs/swagger';
import { GetUserResDTO } from './applications/queries/handlers/getUser/getUserRes.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @Post('/create')
  async create(@Body() createUserDTO: CreateUserDTO) {
    // Excute the use case of the createUser
    return this.commandBus.execute(new CreateUserCommand(createUserDTO));
    // return this.createUserUseCase.execute(createUserDTO);
  }

  @ApiResponse({
    status: 200,
    description: 'Return the user information by the username',
    type: GetUserResDTO,
  })
  @Get(':username')
  async findOne(@Param() getUserReqDTO: GetUserReqDTO): Promise<GetUserResDTO> {
    // Excute the use case of the getUser
    return this.queryBus.execute(new GetUserQuery(getUserReqDTO));
    // return this.getUserUseCase.execute(getUserDTO);
    // return id;
  }
}
