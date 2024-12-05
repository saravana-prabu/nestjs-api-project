import { Injectable } from '@nestjs/common';
import { StoreInterface } from '../interfaces/store.interface';
import { CtService } from '../../ct/ct.service';
import { BlService } from '../../bl/bl.service';
import { VtService } from '../../vt/vt.service';

@Injectable()
export class StoreFactoryService {
  constructor(
    private readonly ctService: CtService,
    private readonly blService: BlService,
    private readonly vtService: VtService,
  ) { }

  getStoreService(storeType: string): StoreInterface {
    switch (storeType) {
      case 'CT':
        return this.ctService;
      case 'BL':
        return this.blService;
      case 'VT':
        return this.vtService;
      default:
        throw new Error(`Unsupported storeType: ${storeType}`);
    }
    return;
  }
}
