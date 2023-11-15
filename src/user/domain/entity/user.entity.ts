import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Exclude, Expose, Transform, Type } from 'class-transformer'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string

  @Column({ length: 15 })
  @Expose()
  email: string

  @Column()
  @Exclude()
  password: string

  // @Column({ nullable: false, type: 'varchar', default: '' })
  // @Expose()
  // discordUrl: string

  @CreateDateColumn()
  @Expose()
  createdAt: Date

  @UpdateDateColumn()
  @Expose()
  updatedAt: Date
}
