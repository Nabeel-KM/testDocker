import { ExchangeRateService } from './exchange-rate.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
