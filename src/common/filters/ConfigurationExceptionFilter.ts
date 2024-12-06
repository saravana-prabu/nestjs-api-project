import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ConfigurationException } from '../../exceptions/ConfigurationException';

@Catch(ConfigurationException)
export class ConfigurationExceptionFilter implements ExceptionFilter {
    catch(exception: ConfigurationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: exception.message,
            error: exception.getResponse(),
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
