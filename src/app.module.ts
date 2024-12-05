import { Module } from '@nestjs/common';
import { BffModule } from './bff/bff.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [BffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
