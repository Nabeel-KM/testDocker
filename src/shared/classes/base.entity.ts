import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongoSchema, Document } from "mongoose";

@Schema({ timestamps: true })
export class BaseEntity {
  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;
}

export const BaseEntitySchema = SchemaFactory.createForClass(BaseEntity);
export type BaseDocument = BaseEntity & Document;
