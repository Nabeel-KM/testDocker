import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class WalletCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  walletAddress: string;

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
  @ApiProperty({ example: 'bc1qyuz7ytxq9hnkuxjd8m3gy6xlxeh5xsdkk4mwe9' })
  @IsString()
  bitcoin: string;

  @ApiProperty({ example: 'MArsfeyS7PhHzsqLpAFGC9pFdhuqHgdL2R' })
  @IsString()
  litecoin: string;

  @ApiProperty({ example: 'DEgDVFa2DoW1533dxeDVdTxQFhMzs1pMke' })
  @IsString()
  dashcoin: string;

  @ApiProperty({ example: 'D6gesivqtgN1hXdsyVBGco7ztub1CQoWMS' })
  @IsString()
  dogecoin: string;

  @ApiProperty({ example: '0xe688b84b23f322a994A53dbF8E15FA82CDB71127' })
  @IsString()
  ethereum: string;

  @ApiProperty({ example: 'TXWGTT3DMMjmhesVquQ6URhzxdo8uSrry1' })
  @IsString()
  tron: string;

  @ApiProperty({ example: '7SmBWyDexRqxufcZYxo4ptv3FutDTxxF8dC61sxMLKmz' })
  @IsString()
  solana: string;

  @ApiProperty()
  @IsBoolean()
  testnet: boolean;
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

export class TronTransactionsDto {
  @ApiProperty({ example: 'TXWGTT3DMMjmhesVquQ6URhzxdo8uSrry1' })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
