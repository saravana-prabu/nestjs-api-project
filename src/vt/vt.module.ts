import { Module } from '@nestjs/common';
import { VtService } from './vt.service';

@Module({
  providers: [VtService]
})
export class VtModule {}
