import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreFactoryService } from '../common/services/store-factory.service';
import { RequestOptions } from '../common/value-object/request-options';
import { Config, ConfigDocument } from './schemas/config.schema';

@Injectable()
export class BffService {
  constructor(@InjectModel(Config.name) private configModel: Model<ConfigDocument>,
  private readonly storeFactory: StoreFactoryService) { }

  async processRequest(storeType: string, funcCode: string, requestOptions: RequestOptions,): Promise<any> {
    console.log('Processing request for:', storeType, funcCode);
    const storeService = this.storeFactory.getStoreService(storeType);
    return storeService.executeRequest(requestOptions);
  }

  async getConfigByStoreType(storeType: string): Promise<Config> {
    return this.configModel.findOne({ storeType }).exec();
  }

  async createConfig(storeType: string, configuration: Record<string, any>): Promise<Config> {
    const newConfig = new this.configModel({ storeType, configuration });
    return newConfig.save();
  }

}
