import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Module } from '@nestjs/common';
import { BitqueryService } from 'src/utils/bitquery/bitquery.service';
import { ExchangeRateService } from 'src/utils/exchange-rate/exchange-rate.service';
import { BlockCypherService } from 'src/utils/blockcypher';
import { MoralisModule } from 'src/utils/moralis/moralis.module';

@Module({
  imports: [MoralisModule],
  controllers: [WalletController],
  providers: [
    WalletService,
    BitqueryService,
    ExchangeRateService,
    BlockCypherService,
  ],
})
export class WalletModule {}
