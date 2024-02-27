import { Test, TestingModule } from '@nestjs/testing'
import { ExpenseController } from '@expense/interface/expense.controller'
import {
  IEXPENSE_SERVICE,
  IRECOMMENDATION_SERVICE,
} from '@common/constants/provider.constant'
import { JwtAuthGuard } from '@auth/infra/passport/guards/jwt.guard'

describe('ExpenController', () => {
  let controller: ExpenseController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: IEXPENSE_SERVICE,
          useValue: {},
        },
        { provide: IRECOMMENDATION_SERVICE, useValue: {} },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockResolvedValue(true) })
      .compile()
    controller = module.get<ExpenseController>(ExpenseController)
  })
  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
