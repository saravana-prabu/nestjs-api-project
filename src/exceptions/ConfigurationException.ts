import { HttpException, HttpStatus } from '@nestjs/common';

export class ConfigurationException extends HttpException {
    constructor(message: string, response: any = null) {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                message: message,
                error: response || 'Configuration error',
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}