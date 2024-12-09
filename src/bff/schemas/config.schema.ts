import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigDocument = Config & Document;

@Schema()
export class Config {
  @Prop({ required: true })
  storeType: string;

  @Prop({ type: Object })
  configuration: Record<string, any>;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
