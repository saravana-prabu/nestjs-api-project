import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Retrieve HttpAdapterHost for use in the exception filter
  const httpAdapterHost = app.get(HttpAdapterHost);

  // Use the custom exception filter globally
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));

  // Use the custom validation pipe globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
