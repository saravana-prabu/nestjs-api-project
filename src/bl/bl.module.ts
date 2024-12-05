import { Module } from '@nestjs/common';
import { BlService } from './bl.service';

@Module({
  providers: [BlService]
})
export class BlModule {}
