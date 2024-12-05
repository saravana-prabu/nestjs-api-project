import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; 
import { HttpService } from '@nestjs/axios';
import { BffService } from './bff.service';
import { BffController } from './bff.controller';
import { StoreFactoryService } from '../common/services/store-factory.service';

import { CtService } from '../ct/ct.service';
import { BlService } from '../bl/bl.service';
import { VtService } from '../vt/vt.service';

@Module({
  imports: [HttpModule],
  providers: [BffService, StoreFactoryService,CtService,BlService,VtService],
  controllers: [BffController]
})
export class BffModule {}
