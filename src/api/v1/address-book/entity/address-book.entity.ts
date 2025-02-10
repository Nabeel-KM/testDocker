import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/classes/base.entity';

export type AddressBookDocument = AddressBookEntity & Document;

@Schema({ timestamps: true })
export class AddressBookEntity extends BaseEntity {
  @Prop({ required: true })
  creator: string;

  @Prop({ required: true })
  contactName: string;

  @Prop({ required: true })
  walletAddress: string;

  @Prop({ required: true })
  chain: string;
}

export const AddressBookSchema =
  SchemaFactory.createForClass(AddressBookEntity);
