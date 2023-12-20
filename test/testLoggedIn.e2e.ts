import { TEST1_USER_LOCAL, TEST_PASSWORD } from '@common/mockData'
import { requestE2E } from './request.e2e'
import { INestApplication } from '@nestjs/common'

export const setupLoggedIn = async (app: INestApplication) => {
  const loginResult = await requestE2E(app, '/auth/login', 'post', 201, {
    email: TEST1_USER_LOCAL.email,
    password: TEST_PASSWORD,
  })

  // console.log('Login Result: ', loginResult.headers)

  const cookies = loginResult.headers['set-cookie']
  const accessTokenCookie = cookies.find((cookie: string) =>
    cookie.includes('accessToken'),
  )

  if (!accessTokenCookie) {
    throw new Error('Access token not found in cookies')
  }

  const accessToken = accessTokenCookie.split('accessToken=')[1].split(';')[0]

  console.log('Access Token: ', accessToken)

  return accessToken
}
