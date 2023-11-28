import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsInt, IsString, Matches } from 'class-validator'
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
  @ApiProperty({ example: USER_EMAIL_EXAMPLE, description: USER_EMAIL })
  @IsEmail({}, { message: VALIDATE_EMAIL })
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string

  @ApiProperty({
    example: USER_PWD_EXAMPLE,
    description: USER_PWD,
  })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/, {
    message: VALIDATE_PASSWORD,
  })
  readonly password: string
}

export class ResRegisterExistUserError {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number

  @ApiProperty({
    example: USER_ALREADY_EXIST,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string

  @ApiProperty({ example: '/api/user/register', description: '요청 경로' })
  @IsString()
  readonly path: string
}
