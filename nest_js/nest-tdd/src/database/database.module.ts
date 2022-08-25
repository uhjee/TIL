import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlDataSource } from './mysql.datasourace';

@Module({
  imports: [TypeOrmModule.forRoot(mysqlDataSource)],
})
export class DatabaseModule {}
