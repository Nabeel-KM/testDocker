import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { Module } from '@nestjs/common';
import { CoingeckoService } from 'src/utils/coingecko/coingecko.service';
import { CoinCron } from './coin.cron';

@Module({
  imports: [],
  controllers: [CoinController],
  providers: [CoinService, CoingeckoService, CoinCron],
})
export class CoinModule {}
