import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserReqDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
