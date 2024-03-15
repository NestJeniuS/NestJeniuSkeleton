import { UUID } from 'crypto'

export class ReqGenerateAccessTokenAppDto {
  readonly id: string
}

export class ReqGenerateRefreshTokenAppDto {
  readonly id: string
}
