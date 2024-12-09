import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { StoreInterface } from '../common/interfaces/store.interface';
import { RequestOptions } from '../common/value-object/request-options';
import * as config from '../config/config.json';

// const { jsonBLMapData } = require('./transformers/transformers');
// import * as transformers from '../../lib/transformers';
const { jsonBLMapData } = require('../../lib/bl/transformers');

import { transformResponse } from '../common/transformer/transformer';

@Injectable()
export class BlService implements StoreInterface {

  constructor(private readonly httpService: HttpService) { }

  async executeRequest(options: RequestOptions): Promise<any> {
    let responseData;
    const { storeType, funcCode, event,proxyKey,baseUrl,partURL,fullUrl,reqMethod, endpoint, method, data, headers } = options;

    // const proxyKey = config[storeType][funcCode];

    console.log('BlService storeType:', storeType);
    console.log('Request funcCode:', funcCode);
    console.log('Request proxyKey:', proxyKey);

    console.log(' jsonBLMapData[funcCode]:::', jsonBLMapData[funcCode])

    if (!proxyKey) {
      console.error(`No configuration found for storeType: ${storeType}, functionCode: ${funcCode}`);
      throw new Error('Configuration error');
    }

    // Retrieve baseUrl and part_url from the config
    // const baseUrl = config[storeType]?.baseApiUrl;
    // const partURL = proxyKey?.part_url;
    // let reqMode = proxyKey?.req_mode;

    if (!baseUrl || !partURL) {
      console.error('Base URL or part URL is missing in the config');
      throw new Error('Configuration error');
    }

    // Construct the full URL by concatenating baseUrl and partURL
    // const fullUrl = baseUrl + partURL;

    
    console.log('Request reqMethod:', reqMethod);
    console.log('Request baseUrl:', baseUrl);
    console.log('Request partURL:', partURL);
    console.log('BlService fullUrl:', fullUrl);
    console.log('BlService method:', method);
    const transformationExpression = jsonBLMapData[funcCode];
    console.log('BlService transformationExpression:', transformationExpression);
    try {
      const response$ = this.httpService.request({
        url: fullUrl,
        method,
        data,
        headers,
      });

      const response = await lastValueFrom(response$);
      //return response.data;
      responseData = response.data;
      console.log('responseData:::::',JSON.stringify(responseData));
      if (transformationExpression) {
        responseData = await transformResponse(responseData, transformationExpression);
      }
      console.log('Aferter transformationExpression responseData:::::',responseData);
      return responseData;
    } catch (error) {
      console.error('Error executing CT API request:', error);
      throw error;
    }
  }
}
