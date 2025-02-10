import { CoingeckoService } from './coingecko.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CoingeckoService],
  exports: [CoingeckoService],
})
export class CoingeckoModule {}
