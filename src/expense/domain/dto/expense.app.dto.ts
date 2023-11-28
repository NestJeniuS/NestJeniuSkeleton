import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsString,
  IsBoolean,
  IsIn,
  IsOptional,
} from 'class-validator'
import { Type } from 'class-transformer'

export class ReqExpenseDto {
  @IsNotEmpty({ message: '지출 금액은 필수적으로 입력해야 합니다.' })
  @IsNumber()
  expense: number

  @IsNotEmpty({ message: '지출 일자는 필수적으로 입력해야 합니다.' })
  @IsDateString()
  date: Date

  @IsString()
  description?: string

  @IsBoolean()
  exception: boolean

  @IsNotEmpty({ message: '카테고리의 id는 필수적으로 입력해야 합니다.' })
  classificationId: number
}

export class GetList {
  @IsString()
  startDate: string

  @IsString()
  endDate: string

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minAmount?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxAmount?: number
}
