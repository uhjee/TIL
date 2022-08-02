import { Board } from 'src/boards/board.entity';
import { BaseTimeEntity } from 'src/common/entity/base.time.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column({ type: 'bool', default: false })
  isDied: boolean;

  @OneToMany((type) => Board, (board) => board.user)
  boards: Board[];
}
