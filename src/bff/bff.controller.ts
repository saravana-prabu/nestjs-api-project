import { Controller, Post, Body, Param,Request } from '@nestjs/common';
import { BffService } from './bff.service';
import { RequestOptions } from '../common/value-object/request-options';
import { ConfigurationException } from '../exceptions/ConfigurationException';
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

    console.log('storeType:', storeType);
    console.log('funcCode:', funcCode);

    const storeConfig = config[storeType];
    if (!storeConfig) {
      throw new ConfigurationException(
        `Invalid storeType: ${storeType}`,
        `No configuration found for storeType: ${storeType}`,
      );
    }

    const proxyKey = storeConfig[funcCode];
    if (!proxyKey) {
      throw new ConfigurationException(
        `Invalid funcCode: ${funcCode}`,
        `No configuration found for funcCode: ${funcCode} in storeType: ${storeType}`,
      );
    }

    console.log('proxyKey:', proxyKey);

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
