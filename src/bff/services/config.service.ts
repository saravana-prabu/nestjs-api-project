import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private config = {
    // Sample configuration
    storeType: 'BL',
    apiUrls: {
      login: '/auth/login',
      getCustomer: '/customer',
    },
  };

  get(key: string): any {
    return this.config[key];
  }

  getAll(): any {
    return this.config;
  }
}
