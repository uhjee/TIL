import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(LoggerMiddleware); // global middleware

  // config 모듈을 사용해 환경변수 가져오기
  const serverConfig = config.get('server');

  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
