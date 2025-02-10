import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/shared/classes/base.service';
import {
  TransactionDocument,
  TransactionEntity,
} from './entity/transaction.entity';
import { TransactionHelper } from './helper/transaction.helper';

@Injectable()
export class TransactionService extends BaseService<
  TransactionEntity,
  TransactionDocument
> {
  constructor(
    @InjectModel(TransactionEntity.name)
    private readonly transactionModel: Model<TransactionDocument>,
    private readonly transactionHelper: TransactionHelper,
  ) {
    super(transactionModel);
  }

  async createTransactionBtc(
    coinSymbol: string,
    payload,
    address: string,
  ): Promise<boolean> {
    try {
      const data = await this.transactionHelper.transformBCTx(
        coinSymbol,
        payload,
        address,
      );

      await this.findOneOrCreate({ txId: data.txId }, { ...data });

      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createTransactionEvmChain(payload): Promise<boolean> {
    try {
      if (payload?.txs?.length > 0) {
        const data = await this.transactionHelper.transformMoralisTx(payload);

        await this.findOneOrCreate({ txId: data.txId }, { ...data });
      }

      return true;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getTransactions(address: string) {
    const from = await this.find({ from: address });
    const to = await this.find({ to: address });

    const results = [...from, ...to];
    return results;
  }
}
