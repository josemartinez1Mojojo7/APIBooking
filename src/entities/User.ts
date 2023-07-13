import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({type:"datetime"})
  createAt: Date;
  @UpdateDateColumn({type:"datetime"})
  updateAt: Date;
}
