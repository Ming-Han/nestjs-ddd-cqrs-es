import { GetUserReqDTO } from '../handlers/getUser/getUserReq.dto';

export class GetUserQuery {
  constructor(public readonly getUserDTO: GetUserReqDTO) {}
}
