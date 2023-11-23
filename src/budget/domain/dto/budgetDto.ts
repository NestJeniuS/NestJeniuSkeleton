import { UUID } from 'crypto'
import {
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsObject,
  ValidationOptions,
  IsDateString,
  registerDecorator,
} from 'class-validator'
import { IsCategoryId } from '@common/decorators/budget.decorator'

export class ReqCreateBudgetDto {
  readonly userId: UUID

  @IsNotEmpty({ message: '월 예산은 필수적으로 입력해야 합니다.' })
  readonly month: string

  @IsNotEmpty({ message: '각 카테고리별 예산은 필수적으로 입력해야 합니다.' })
  @IsCategoryId({ message: '카테고리 id는 1~18로 설정해주세요.' })
  @IsObject()
  readonly amount: Record<number, number>
}

export class ResCreateBudgetDto {
  readonly id: number
}
