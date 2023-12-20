import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '../../src/app.module'
import { requestE2E } from '../request.e2e'
import * as cookieParser from 'cookie-parser'
import { MOCK_USER, TEST_PASSWORD } from '@common/mockData'

describe('로그인 in AuthController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        skipMissingProperties: true,
      }),
    )
    app.use(cookieParser())
    await app.init()
  }, 30000)

  afterAll(async () => {
    const loginResult = await requestE2E(app, '/auth/login', 'post', 201, body)
    const accessToken = loginResult.headers['set-cookie']
      .find((cookie: string) => cookie.includes('accessToken'))
      .split('accessToken=')[1]
      .split(';')[0]

    await app.close()
  })

  const path = '/auth/login'
  const body = { email: MOCK_USER.email, password: TEST_PASSWORD }

  it('로그인 e2e 테스트', async () => {
    await requestE2E(app, path, 'post', 201, body)
  }, 30000)
})
