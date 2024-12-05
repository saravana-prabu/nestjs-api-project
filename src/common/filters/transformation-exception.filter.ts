import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { TransformationException } from '../../exceptions/transformation.exception';

@Catch(TransformationException)
export class TransformationExceptionFilter implements ExceptionFilter {
    catch(exception: TransformationException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus();
        response.status(status).json({
            statusCode: status,
            message: exception.message,
            error: exception.getResponse(),
        });
    }
}
