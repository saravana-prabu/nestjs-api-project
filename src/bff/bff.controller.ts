import { Controller, Post, Body, Param,Request } from '@nestjs/common';
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
    @Request() req: Request,
  ) {
    console.log('storeType:', storeType);
    console.log('functionCode:', functionCode);
    console.log('requestOptions:', requestOptions);
    console.log('Request Object:', req);

    // You can access other properties like headers, cookies, etc. from req
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    
    // const transformationExpression = '$.data.items[0]';
    const transformationExpression = '{"data": data}';

    requestOptions.transformationExpression = transformationExpression;

    return this.bffService.processRequest(storeType, functionCode, requestOptions);
  }
}
