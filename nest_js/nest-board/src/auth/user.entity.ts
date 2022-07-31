import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username']) // 유니크 컬럼 지정
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  /**
   * 관계 설정 ( user - board )
   * eager: user를 조회할 때 항상 board의 데이터도 불러올 것인지 설정
   */
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
