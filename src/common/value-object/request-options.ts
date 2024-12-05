import { IsString, IsOptional, IsObject, IsIn } from 'class-validator';

export class RequestOptions {
    @IsString()
    endpoint: string;

    @IsString()
    @IsIn(['GET', 'POST', 'PUT', 'DELETE'])
    method: string;

    @IsOptional()
    @IsObject()
    data?: any;

    @IsOptional()
    @IsObject()
    headers?: any;

    constructor(partial: Partial<RequestOptions>) {
        Object.assign(this, partial);
    }
}
