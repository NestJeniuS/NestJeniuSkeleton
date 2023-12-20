import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

export const requestE2E = async (
  app: INestApplication,
  path: string,
  method: string,
  status: number,
  body?: object,
  accessToken?: string,
): Promise<request.Response> => {
  const serverRequest = request(app.getHttpServer())
    [method](path)
    .set('User-Agent', '')
    .expect(status)

  if (body) {
    serverRequest
      .set('Content-Type', 'application/json') // Content-Type 헤더 설정
      .send(body)
  }
  console.log('Inside requestE2E, accessToken: ', accessToken)
  if (accessToken) {
    serverRequest.set('Cookie', [`accessToken=${accessToken}`]) // 쿠키 기반 인증
    serverRequest.set('Authorization', `Bearer ${accessToken}`) // Bearer 토큰 기반 인증
  }
  const response = await serverRequest

  console.log(response.header)

  return response
}
