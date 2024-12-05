import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: BadRequestException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        const response = exception.getResponse();
        const statusCode = exception.getStatus();

        httpAdapter.reply(ctx.getResponse(), {
            statusCode,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message: response['message'] || 'Validation failed',
            errors: response['errors'] || [],
        }, statusCode);
    }
}
