import { Controller, Post, Body, Param } from '@nestjs/common';
import { BffService } from './bff.service';
import { RequestOptions } from '../common/value-object/request-options';
import { validate } from 'class-validator';

@Controller('api')
export class BffController {
  constructor(private readonly bffService: BffService) { }

  @Post('/:storeType/:functionCode')
  async proxyRequest(@Param('storeType') storeType: string,
    @Param('functionCode') functionCode: string,
    @Body() body: any,) {
    const { endpoint, method, data, headers } = body;
    console.log('storeType:', storeType);
    console.log('functionCode:', functionCode);
    console.log('body:::', body)
    // Create and validate RequestOptions
    const requestOptions = new RequestOptions(body);
    const errors = await validate(requestOptions);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors}`);
    }
    return this.bffService.processRequest(storeType, functionCode, requestOptions);
  }
}
