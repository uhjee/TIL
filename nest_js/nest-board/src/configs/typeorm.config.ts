import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // typeorm이 참고할 entiry 위치
  synchronize: dbConfig.synchronize, // 애플리케이션을 다시 실행할 때, entiry 에서 수정된 컬럼의 길이, 타입, 변경값 등을 해당 테이블을 drop 한 후 다시 생성
};
