import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from 'src/shared/classes/base.entity';

export type CoinDocument = CoinEntity & Document;

@Schema({ timestamps: true })
export class CoinEntity extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  coinSymbol: string;

  @Prop({ required: true })
  contractAddress: string;

  @Prop({ default: {}, type: Object })
  statistics: object;

  @Prop({ Type: Boolean, default: false })
  isErc20?: boolean;

  @Prop({ Type: Boolean, default: false })
  isBep20?: boolean;

  @Prop({ Type: Boolean, default: false })
  isTrc20?: boolean;

  @Prop({ required: true })
  chain: string;

  @Prop({ type: Array })
  contractAbi?: [];

  @Prop({ required: true })
  decimal: number;

  @Prop({ default: '' })
  coingeckoId?: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  isDefault: boolean;
}

export const CoinSchema = SchemaFactory.createForClass(CoinEntity);
