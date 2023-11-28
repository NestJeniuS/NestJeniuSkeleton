import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString, Matches } from 'class-validator'
import { VALIDATE_PASSWORD } from '@common/messages/auth/auth.messages'
import { USER_PWD, USER_PWD_EXAMPLE } from '@common/constants/user.constant'
import { AUTH_INVALID_PASSWORD } from '@common/messages/auth/auth.errors'

export class ReqCheckPasswordDto {
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

export class ResInvalidCheckPassword {
  @ApiProperty({ example: 401, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number

  @ApiProperty({
    example: AUTH_INVALID_PASSWORD,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string

  @ApiProperty({
    example: '/api/auth/check-password',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string
}
