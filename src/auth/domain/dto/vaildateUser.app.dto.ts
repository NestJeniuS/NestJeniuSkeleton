import { UUID } from 'crypto'

export class ReqValidateUserAppDto {
  readonly email: string
  readonly password: string
}

export class ResValidateUserAppDto {
  readonly id: UUID
  readonly email: string
  readonly createdAt: Date
}
