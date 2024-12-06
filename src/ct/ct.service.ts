import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { StoreInterface } from '../common/interfaces/store.interface';
import { RequestOptions } from '../common/value-object/request-options';
import { transformResponse } from '../common/transformer/transformer';

@Injectable()
export class CtService implements StoreInterface {

  constructor(private readonly httpService: HttpService) { }

  async executeRequest(options: RequestOptions): Promise<any> {
    const { endpoint, method, data, headers } = options;
    try {
      let responseData;
      const transformationExpression = '{"data": data}';
      if (method === 'POST' && typeof data === 'object' && data.query) {
        // Handle GraphQL request
        console.log('CtService::endpoint:::', endpoint)
        console.log('CtService::data:::', data)
        console.log('CtService::headers:::', headers)
        console.log('CtService::transformationExpression :::', transformationExpression)
        const response$ = this.httpService.post(endpoint, data, { headers });
        const response = await lastValueFrom(response$);
        responseData = response.data;
      } else {
        // Handle REST request
        const response$ = this.httpService.request({
          url: endpoint,
          method,
          data,
          headers,
        });
        const response = await lastValueFrom(response$);
        responseData = response.data;
      }
      // Apply transformation using JSONata if provided
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