import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "src/shared/classes/base.entity";

export type WalletDocument = WalletEntity & Document;

@Schema({ timestamps: true })
export class WalletEntity extends BaseEntity {
  @Prop({ required: true })
  walletAddress: string;

  @Prop({ required: true })
  chain: string;

  @Prop({ required: true })
  protocol: string;
}

export const WalletSchema = SchemaFactory.createForClass(WalletEntity);
