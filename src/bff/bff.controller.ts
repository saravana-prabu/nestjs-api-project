import { Controller, Post, Body, Param,Request } from '@nestjs/common';
import { BffService } from './bff.service';
import { RequestOptions } from '../common/value-object/request-options';
import * as config from '../config/config.json';

@Controller('api')
export class BffController {
  constructor(private readonly bffService: BffService) { }

  @Post('/:storeType/:funcCode')
  async proxyRequest(
    @Param('storeType') storeType: string,
    @Param('funcCode') funcCode: string,
    @Body() requestOptions: RequestOptions,
    @Request() req: Request,
  ) {
    console.log('storeType:', storeType);
    console.log('funcCode:', funcCode);

    // You can access other properties like headers, cookies, etc. from req
    // console.log('Request headers:', req.headers);
    // console.log('Request body:', req.body);

    const proxyKey = config[storeType][funcCode];

    console.log('Request storeType:', storeType);
    console.log('Request funcCode:', funcCode);
    console.log('Request proxyKey:', proxyKey);

    if (!proxyKey) {
      console.error(`No configuration found for storeType: ${storeType}, functionCode: ${funcCode}`);
      throw new Error('Configuration error');
    }

    // Retrieve baseUrl and part_url from the config
    const baseUrl = config[storeType]?.baseApiUrl;
    const partURL = proxyKey?.part_url;
    let reqMethod = proxyKey?.req_mode;

    if (!baseUrl || !partURL) {
      console.error('Base URL or part URL is missing in the config');
      throw new Error('Configuration error');
    }

    // Construct the full URL by concatenating baseUrl and partURL
    const fullUrl = baseUrl + partURL;

    // requestOptions.storeType = storeType;
    // requestOptions.funcCode = funcCode;
    // requestOptions.baseUrl = baseUrl;
    // requestOptions.partURL = partURL;
    // requestOptions.reqMethod = reqMethod;
    // requestOptions.event = req;

    requestOptions = {
      ...requestOptions,
      storeType,
      funcCode: funcCode,
      baseUrl: baseUrl,
      partURL: partURL,
      fullUrl: fullUrl,
      reqMethod: reqMethod,
      event: req,
      proxyKey
    };

    
    console.log('Request reqMethod:', reqMethod);
    console.log('Request baseUrl:', baseUrl);
    console.log('Request partURL:', partURL);
    console.log('Request fullUrl:', fullUrl);
    
    // const transformationExpression = '{"data": setup}';
    // // const transformationExpression = '{"data": data}';

    // requestOptions.transformationExpression = transformationExpression;

    return this.bffService.processRequest(storeType, funcCode, requestOptions);
  }
}
