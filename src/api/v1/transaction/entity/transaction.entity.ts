import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/classes/base.entity';

export type TransactionDocument = TransactionEntity & Document;

@Schema({ timestamps: true })
export class TransactionEntity extends BaseEntity {
  @Prop()
  coinSymbol: string;

  @Prop()
  to: string;

  @Prop()
  from: string;

  @Prop()
  amount: string;

  @Prop()
  fee: number;

  @Prop()
  txId: string;

  @Prop()
  confirmations: number;

  @Prop()
  timeStamp: string;

  @Prop()
  explorer: string;

  @Prop()
  explorerUrl: string;

  @Prop()
  blockHeight: number;
}

export const TransactionSchema =
  SchemaFactory.createForClass(TransactionEntity);
