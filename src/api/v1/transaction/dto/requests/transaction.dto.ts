import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WalletCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hash: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  chain: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  protocol: string;
}

export class WalletAddresses {
  @ApiProperty()
  address: string;

  @ApiProperty()
  chain: string;
}

export class AssetsDto {
  @ApiProperty({ example: '1FnatpgraY3HA2CSsXrdd5f1ZDsd5M81mK' })
  @IsString()
  bitcoin: string;

  @ApiProperty({ example: 'MArsfeyS7PhHzsqLpAFGC9pFdhuqHgdL2R' })
  @IsString()
  litecoin: string;

  @ApiProperty({ example: 'DEgDVFa2DoW1533dxeDVdTxQFhMzs1pMke' })
  @IsString()
  dashcoin: string;

  @ApiProperty({ example: 'XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw' })
  @IsString()
  dogecoin: string;

  @ApiProperty({ example: '0xe688b84b23f322a994A53dbF8E15FA82CDB71127' })
  @IsString()
  ethereum: string;
}

export class TransactionsDto {
  @ApiProperty({ example: '1FnatpgraY3HA2CSsXrdd5f1ZDsd5M81mK' })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({ example: 'bitcoin' })
  @IsString()
  @IsNotEmpty()
  network: string;
}
