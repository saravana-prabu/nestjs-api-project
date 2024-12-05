import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { StoreInterface } from '../common/interfaces/store.interface';
import { RequestOptions } from '../common/value-object/request-options';

@Injectable()
export class BlService implements StoreInterface {

  constructor(private readonly httpService: HttpService) { }

  async executeRequest(options: RequestOptions): Promise<any> {
    const { endpoint, method, data, headers } = options;
    try {
      const response$ = this.httpService.request({
        url: endpoint,
        method,
        data,
        headers,
      });

      const response = await lastValueFrom(response$);
      return response.data;
    } catch (error) {
      console.error('Error executing CT API request:', error);
      throw error;
    }
  }
}
