import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoinService } from './coin.service';

@Injectable()
export class CoinCron {
  constructor(private coinService: CoinService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async fetchStatistics() {
    await this.coinService.fetchStatistics();
    return true;
  }
}
