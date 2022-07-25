import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'system',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // typeorm이 참고할 entiry 위치
  synchronize: true, // 애플리케이션을 다시 실행할 때, entiry 에서 수정된 컬럼의 길이, 타입, 변경값 등을 해당 테이블을 drop 한 후 다시 생성
};
