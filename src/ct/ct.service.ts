import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { StoreInterface } from '../common/interfaces/store.interface';
import { RequestOptions } from '../common/value-object/request-options';

@Injectable()
export class CtService implements StoreInterface {

  constructor(private readonly httpService: HttpService) { }

  async executeRequest(options: RequestOptions): Promise<any> {
    const { endpoint, method, data, headers } = options;
    try {
      if (method === 'POST' && typeof data === 'object' && data.query) {
        // Handle GraphQL request
        console.log('CtService::endpoint:::', endpoint)
        console.log('CtService::data:::', data)
        console.log('CtService::headers:::', headers)
        const response$ = this.httpService.post(endpoint, data, { headers });
        const response = await lastValueFrom(response$);
        return response.data;
      } else {
        // Handle REST request
        const response$ = this.httpService.request({
          url: endpoint,
          method,
          data,
          headers,
        });
        const response = await lastValueFrom(response$);
        return response.data;
      }
    } catch (error) {
      console.error('Error executing CT API request:', error);
      throw error;
    }
  }
}