import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Document } from 'mongoose';
import { ErrorStatus } from 'src/shared/enums/role.enum';

export type LogDocument = LogEntity &
  Document & {
    _id?: any;
  };

@Schema({ timestamps: true })
export class LogEntity {
  _id?: any;

  @Prop()
  message: string;

  @Prop()
  dir: string;

  @IsEnum(ErrorStatus, { always: true })
  @Prop({ default: ErrorStatus.SUCCESS })
  type: ErrorStatus;

  @Prop()
  errorCode: number;
}

export const LogSchema = SchemaFactory.createForClass(LogEntity);
