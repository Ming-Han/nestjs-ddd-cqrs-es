import { IsNotEmpty } from 'class-validator';

export class GetUserDTO {
  @IsNotEmpty()
  username: string;
}
