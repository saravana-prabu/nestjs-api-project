import { Injectable } from '@nestjs/common';
import { StoreFactoryService } from '../common/services/store-factory.service';
import { RequestOptions } from '../common/value-object/request-options';

@Injectable()
export class BffService {
  constructor(private readonly storeFactory: StoreFactoryService) { }

  async processRequest(storeType: string, funcCode: string, requestOptions: RequestOptions,): Promise<any> {
    console.log('Processing request for:', storeType, funcCode);
    const storeService = this.storeFactory.getStoreService(storeType);
    return storeService.executeRequest(requestOptions);
  }

}
