import { Controller, Post, Body, Param } from '@nestjs/common';
import { BffService } from './bff.service';
import { RequestOptions } from '../common/value-object/request-options';

@Controller('api')
export class BffController {
  constructor(private readonly bffService: BffService) { }

  @Post('/:storeType/:functionCode')
  async proxyRequest(
    @Param('storeType') storeType: string,
    @Param('functionCode') functionCode: string,
    @Body() requestOptions: RequestOptions,
  ) {
    console.log('storeType:', storeType);
    console.log('functionCode:', functionCode);
    console.log('requestOptions:', requestOptions);

    return this.bffService.processRequest(storeType, functionCode, requestOptions);
  }
}
