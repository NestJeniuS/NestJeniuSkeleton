import {
  IsDate,
  IsDateString,
  IsEmail,
  IsInt,
  IsString,
  Matches,
} from 'class-validator'
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '@common/messages/auth/auth.messages'
import { Transform } from 'class-transformer'
import {
  USER_EMAIL,
  USER_EMAIL_EXAMPLE,
  USER_PWD,
  USER_PWD_EXAMPLE,
} from '@common/constants/user.constant'
import { USER_ALREADY_EXIST } from '@common/messages/user/user.errors'

export class ReqRegisterDto {
  @IsEmail({}, { message: VALIDATE_EMAIL })
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string

  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/, {
    message: VALIDATE_PASSWORD,
  })
  readonly password: string

  @IsString()
  readonly name: string

  @IsString()
  readonly nickname: string

  @IsDateString()
  readonly birthdate: Date

  @IsInt()
  readonly age: number

  @IsString()
  readonly gender: string
}

export class ResRegisterExistUserError {
  @IsInt()
  readonly statusCode: number

  @IsString()
  readonly message: string

  @IsString()
  readonly path: string
}
