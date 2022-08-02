import { BaseTimeEntity } from 'src/common/entity/base.time.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
