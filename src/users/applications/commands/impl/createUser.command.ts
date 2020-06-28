import { CreateUserDTO } from '../handlers/createUser/createUser.dto';

export class CreateUserCommand {
  constructor(public readonly createUserDTO: CreateUserDTO) {}
}
