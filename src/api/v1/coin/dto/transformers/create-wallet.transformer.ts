import { ApiProperty } from '@nestjs/swagger';
import { CoinEntity } from '../../entity/coin.entity';

export class CreateCoinTransformer {
  @ApiProperty()
  name: string;

  @ApiProperty()
  coinSymbol: string;

  @ApiProperty()
  contractAddress: string;

  @ApiProperty()
  statistics: {};

  @ApiProperty()
  isErc20: boolean;

  @ApiProperty()
  isBep20: boolean;

  @ApiProperty()
  chain: string;

  @ApiProperty()
  contractAbi: [];

  @ApiProperty()
  decimal: number;

  @ApiProperty()
  coingeckoId: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  isDefault: boolean;

  constructor(entityObj: CoinEntity) {
    this.name = entityObj.name;
    this.coinSymbol = entityObj.coinSymbol;
    this.contractAddress = entityObj.contractAddress;
    this.statistics = entityObj.statistics;
    this.isErc20 = entityObj.isErc20;
    this.isBep20 = entityObj.isBep20;
    this.chain = entityObj.chain;
    this.contractAbi = entityObj.contractAbi;
    this.decimal = entityObj.decimal;
    this.coingeckoId = entityObj.coingeckoId;
    this.active = entityObj.active;
    this.isDefault = entityObj.isDefault;
  }
}
