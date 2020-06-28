import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description:
      'The name which you want to use it to create a user in the system.',
    minLength: 2,
    maxLength: 15,
  })
  @IsNotEmpty()
  username: string;
}
