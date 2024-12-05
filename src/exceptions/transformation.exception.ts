import { HttpException, HttpStatus } from '@nestjs/common';

export class TransformationException extends HttpException {
  constructor(message: string, response: any) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: message,
        error: response,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
