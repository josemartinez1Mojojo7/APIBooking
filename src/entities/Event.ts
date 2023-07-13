import{
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Event extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  lugar: string;
  @Column({type:"datetime"})
  fechaHora: Date;
  @Column("simple-array")
  gps: string[];
  @Column({type:"double"})
  precio: number;
  @Column()
  limite: number;
  @Column()
  tipoEvento: string;

  @CreateDateColumn({type:"datetime"})
  createAt: Date;
  @UpdateDateColumn({type:"datetime"})
  updateAt: Date;

}