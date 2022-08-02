import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './config/database/dbConfig';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
