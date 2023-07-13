import{
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm'
import { User } from './User';
import { Event } from './Event';

@Entity()
export class Booking extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Event)
  event: Event

  @Column({ type:"double" })
  precio: number;
  @Column({ type:"datetime" })
  fechaHora: Date;
  @Column()
  lugar: string;
  @Column("simple-array")
  gps: string[];

  @CreateDateColumn({ type:"datetime" })
  createAt: Date;
  @UpdateDateColumn({ type:"datetime" })
  updateAt: Date;

}