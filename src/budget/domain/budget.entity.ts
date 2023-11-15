import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from 'src/user/domain/entity/user.entity'
import { Classification } from 'src/classification/domain/classification.entity'

@Entity()
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id)
  user: number

  @ManyToOne(() => Classification, (classification) => classification.id)
  classification: number

  @Column({ type: 'int', nullable: true })
  amount: number

  @Column({ type: 'date', nullable: true })
  month: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
