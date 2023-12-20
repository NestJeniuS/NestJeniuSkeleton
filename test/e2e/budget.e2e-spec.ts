import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '../../src/app.module'
import { requestE2E } from '../request.e2e'
import * as cookieParser from 'cookie-parser'
import { setupLoggedIn } from '../testLoggedIn.e2e'

describe('예산설정 in BudgetController (e2e)', () => {
  let app: INestApplication
  let accessToken: string

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

    accessToken = await setupLoggedIn(app)
  }, 30000)

  afterAll(async () => {
    await app.close()
  })

  const body = {
    month: '2023-12',
    amount: {
      '1': 2000,
      '2': 26000,
      '3': 32000,
      '4': 16200,
      '5': 58900,
      '6': 50000,
      '7': 50000,
      '8': 35000,
      '9': 50000,
      '10': 45000,
      '11': 200000,
      '12': 65000,
      '13': 45000,
      '14': 32000,
      '15': 300000,
      '16': 3000,
      '17': 15400,
      '18': 12000,
    },
  }
  const month = '2023-10'
  const total = '2000000'

  it('예산설정 e2e 테스트', async () => {
    console.log('Before requestE2E, accessToken: ', accessToken)
    await requestE2E(app, '/budgets', 'post', 409, body, accessToken)
    // await requestE2E(
    //   app,
    //   `/budgets?month=${month}&total=${total}`,
    //   'put',
    //   200,
    //   null,
    //   accessToken,
    // )
  }, 30000)
})
