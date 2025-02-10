import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class BlockSubAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isblocked: boolean;

  @ApiProperty()
  reasonToBlock: string;
}

class DeleteSubAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;
}

export { BlockSubAdminDto, DeleteSubAdminDto };
