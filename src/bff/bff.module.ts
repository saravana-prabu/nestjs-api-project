import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; 
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './services/config.service';
import { Config, ConfigSchema } from './schemas/config.schema';
import { BffService } from './bff.service';
import { BffController } from './bff.controller';
import { StoreFactoryService } from '../common/services/store-factory.service';

import { CtService } from '../ct/ct.service';
import { BlService } from '../bl/bl.service';
import { VtService } from '../vt/vt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }]),
    HttpModule
  ],
  providers: [BffService, ConfigService, StoreFactoryService,CtService,BlService,VtService],
  controllers: [BffController],
  exports: [ConfigService],
})
export class BffModule {}
