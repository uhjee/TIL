import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { LoggerMiddleware } from './common/middleware/log.middleware';

@Module({
  imports: [BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('boards');
  }
}
