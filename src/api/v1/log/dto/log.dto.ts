import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ErrorStatus } from 'src/shared/enums/role.enum';

export class LogDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  dir: string;

  @IsEnum(ErrorStatus, { always: true })
  @ApiProperty()
  type: ErrorStatus;

  @ApiProperty()
  errorCode: number;
}
