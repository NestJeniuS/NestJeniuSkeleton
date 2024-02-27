import { Test, TestingModule } from '@nestjs/testing'
import { BudgetService } from '@budget/app/budget.service'
import { IBUDGET_REPOSITORY } from '@common/constants/provider.constant'
import { v4 as uuidv4 } from 'uuid'

describe('BudgetService', () => {
  let service: BudgetService

  //이런식으로 공유 픽스처를 사용하지 않기 -> 나중에 리팩터링
  const mockBudgetRespositroy = {
    findSameBudget: jest.fn(),
    createBudget: jest.fn(),
    updateBudget: jest.fn(),
    getMonthlyBudgetRatio: jest.fn(),
  }

  const mockBudget = {
    userId: uuidv4(),
    month: '2023-11',
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetService,
        { provide: IBUDGET_REPOSITORY, useValue: mockBudgetRespositroy },
      ],
    }).compile()

    service = module.get<BudgetService>(BudgetService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create budget if it does not exist', async () => {
    mockBudgetRespositroy.findSameBudget.mockResolvedValue({})

    await expect(service.createBudget(mockBudget)).resolves.toBe(
      '예산 설정에 성공하였습니다.',
    )
  })

  it('should update budget if it exists', async () => {
    mockBudgetRespositroy.findSameBudget.mockResolvedValue(mockBudget)

    await expect(service.updateBudget(mockBudget)).resolves.toBe(
      '예산 변경에 성공하였습니다.',
    )
  })

  it('should return recommended budget', async () => {
    const mockReq = {
      userId: uuidv4(),
      month: '2023-11',
      total: 2000000,
    }

    const mockRatio = {
      '1': 0.04,
      '2': 0.48,
      '3': 0.6,
      '4': 0.3,
      '5': 1.1,
      '6': 0.93,
      '7': 0.93,
      '8': 0.65,
      '9': 0.93,
      '10': 0.84,
      '11': 3.73,
      '12': 1.21,
      '13': 0.84,
      '14': 0.6,
      '15': 5.59,
      '16': 0.06,
      '17': 0.29,
      '18': 0.22,
    }

    const expectedResponse = {
      message: '정상적으로 추천 예산이 생성되었습니다.',
      recommendedBudget: {
        '1': 800,
        '2': 9600,
        '3': 12000,
        '4': 6000,
        '5': 22000,
        '6': 18600,
        '7': 18600,
        '8': 13000,
        '9': 18600,
        '10': 16800,
        '11': 74600,
        '12': 24200,
        '13': 16800,
        '14': 12000,
        '15': 111800,
        '16': 1200,
        '17': 5800,
        '18': 4400,
      },
    }

    mockBudgetRespositroy.getMonthlyBudgetRatio.mockResolvedValue(mockRatio)

    await expect(service.recommendBudget(mockReq)).resolves.toEqual(
      expectedResponse,
    )
  })
})
