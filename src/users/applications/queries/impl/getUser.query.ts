import { GetUserDTO } from '../handlers/getUser/getUser.dto';

export class GetUserQuery {
  constructor(public readonly getUserDTO: GetUserDTO) {}
}
