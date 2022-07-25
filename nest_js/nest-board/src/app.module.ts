import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { LoggerMiddleware } from './common/middleware/log.middleware';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // middleware 적용 대상
    consumer.apply(LoggerMiddleware).forRoutes({
      // path: 'boards',
      path: 'boa*ds', // route path wildcard 사용
      method: RequestMethod.GET,
    });
  }
}
