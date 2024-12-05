import { Module } from '@nestjs/common';
import { CtService } from './ct.service';

@Module({
  providers: [CtService]
})
export class CtModule {}
