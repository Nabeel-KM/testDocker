import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddressBookCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creator: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contactName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  chain: string;
}
