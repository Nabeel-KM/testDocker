import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CoinCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  contractAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  coinSymbol: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  isErc20: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  isBep20: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  chain: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(1000)
  decimal: number;

  @ApiProperty()
  @IsOptional()
  coingeckoId: string;

  @ApiProperty()
  @IsBoolean()
  isDefault: boolean;
}
