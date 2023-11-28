import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsInt, IsString, Matches } from 'class-validator'
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '@common/messages/auth/auth.messages'
import {
  USER_EMAIL,
  USER_EMAIL_EXAMPLE,
  USER_PWD,
  USER_PWD_EXAMPLE,
} from '@common/constants/user.constant'
import { USER_NOT_FOUND } from '@common/messages/user/user.errors'
import { AUTH_INVALID_PASSWORD } from '@common/messages/auth/auth.errors'

export class ReqLoginDto {
  @ApiProperty({ example: USER_EMAIL_EXAMPLE, description: USER_EMAIL })
  @IsEmail({}, { message: VALIDATE_EMAIL })
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

export class ResNotFoundUser {
  @ApiProperty({ example: 404, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number

  @ApiProperty({
    example: USER_NOT_FOUND,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string

  @ApiProperty({ example: '/api/auth/login', description: '요청 경로' })
  @IsString()
  readonly path: string
}

export class ResInvalidPassword {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number

  @ApiProperty({
    example: AUTH_INVALID_PASSWORD,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string

  @ApiProperty({ example: '/api/auth/login', description: '요청 경로' })
  @IsString()
  readonly path: string
}
