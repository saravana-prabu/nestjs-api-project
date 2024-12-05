import { IsString, IsNotEmpty, IsUrl, IsIn } from 'class-validator';

export class RequestOptions {
    @IsUrl({}, { message: 'Endpoint must be a valid URL' })
    @IsNotEmpty({ message: 'Endpoint is required' })
    endpoint: string;

    @IsString({ message: 'Method must be a string' })
    @IsNotEmpty({ message: 'Method is required' })
    @IsIn(['GET', 'POST', 'PUT', 'DELETE'], { message: 'Method must be one of GET, POST, PUT, DELETE' })
    method: string;

    data?: any;

    headers?: Record<string, any>;

    transformationExpression?: any;

    storeType?: string;
    funcCode?: string;
    event?: any;
    proxyKey?: string;
    baseUrl?: string;
    partURL?: string;
    fullUrl?: string;
    reqMethod?: string;
}
