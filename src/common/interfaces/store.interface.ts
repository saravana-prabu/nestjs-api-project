import { RequestOptions } from '../value-object/request-options';

export interface StoreInterface {
  executeRequest(options: RequestOptions): Promise<any>;
}
