import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdminEntity,
  AdminSchema,
} from 'src/api/v1/admin-auth/entity/admin.schema';
import {
  WalletEntity,
  WalletSchema,
} from 'src/api/v1/wallet/entity/wallet.entity';
import { CoinEntity, CoinSchema } from 'src/api/v1/coin/entity/coin.entity';
import {
  AddressBookEntity,
  AddressBookSchema,
} from 'src/api/v1/address-book/entity/address-book.entity';
import { LogEntity, LogSchema } from '../api/v1/log/entity/log.schema';
import {
  TransactionEntity,
  TransactionSchema,
} from 'src/api/v1/transaction/entity/transaction.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: AdminEntity.name, schema: AdminSchema },
      { name: WalletEntity.name, schema: WalletSchema },
      { name: TransactionEntity.name, schema: TransactionSchema },
      { name: CoinEntity.name, schema: CoinSchema },
      { name: AddressBookEntity.name, schema: AddressBookSchema },
      { name: LogEntity.name, schema: LogSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
