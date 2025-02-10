import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminAuthModule } from './api/v1/admin-auth/admin-auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from './config.schema';
import { DatabaseModule } from './database/database.module';
import { EmailHandlerModule } from './utils/email-handler/email-handler.module';
import { GatewaysModule } from './utils/gateways/gateways.module';
import { S3StorageModule } from './utils/s3Storage/s3Storage.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerExceptionFilter } from './shared/guards/custom-throttler.guard';
import { LogService } from './api/v1/log/log.service';
import { LogModule } from './api/v1/log/log.module';
import { WalletModule } from './api/v1/wallet/wallet.module';
import { CoinModule } from './api/v1/coin/coin.module';
import { AddressBookModule } from './api/v1/address-book/address-book.module';
import { TransactionModule } from './api/v1/transaction/transaction.module';
import { MoralisModule } from './utils/moralis/moralis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`./env/.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    S3StorageModule,
    EmailHandlerModule,
    GatewaysModule,
    AdminAuthModule,
    WalletModule,
    TransactionModule,
    MoralisModule,
    CoinModule,
    AddressBookModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerExceptionFilter,
    },
    LogService,
  ],
})
export class AppModule {}
