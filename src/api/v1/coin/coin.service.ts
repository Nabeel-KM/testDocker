import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/shared/classes/base.service';
import { CoingeckoService } from 'src/utils/coingecko/coingecko.service';
import { CoinCreateDto } from './dto/requests/coin-create.dto';
import { CoinDocument, CoinEntity } from './entity/coin.entity';

@Injectable()
export class CoinService extends BaseService<CoinEntity, CoinDocument> {
  constructor(
    @InjectModel(CoinEntity.name)
    private readonly coinModel: Model<CoinDocument>,

    private readonly coingeckoService: CoingeckoService,
  ) {
    super(coinModel);
  }

  async getActiveCoins() {
    const data = await this.find({ active: true });
    return data;
  }

  async createEntry(payload: CoinCreateDto): Promise<object> {
    try {
      const coingeckoIds = await this.coingeckoService.fetchCoinIds();

      const coingeckoId = coingeckoIds.filter(
        (e: { symbol: string }) => e.symbol === payload.coinSymbol,
      );

      const res = await this.findOneOrCreate(
        { coinSymbol: payload.coinSymbol },
        { ...payload, coingeckoId: coingeckoId[0]['id'], active: true },
      );
      return {
        status: 201,
        message: 'New entry created successfully!',
        payload: res,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async fetchStatistics(): Promise<object> {
    const coins = await this.getActiveCoins();

    const coinIds = coins.map((e) => e.coingeckoId !== '' && e.coingeckoId);

    const coinMarketData = await this.coingeckoService.fetchtatistics(
      coinIds.join(','),
      'usd',
      true,
    );

    for (let index = 0; index < coinMarketData.length; index++) {
      let rate: any = coinMarketData[index];

      await this.findOneOrCreate(
        { coingeckoId: rate.id },
        {
          statistics: rate,
        },
      );
    }

    return {
      message: 'Coins market data synchronized!',
    };
  }
}
