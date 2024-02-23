import { Test, TestingModule } from '@nestjs/testing'
import { BudgetController } from '@budget/interface/budget.controller'
import { IBUDGET_SERVICE } from '@common/constants/provider.constant'
import { JwtAuthGuard } from '@auth/infra/passport/guards/jwt.guard'
import { Request } from 'express'
import { IBudgetService } from '@budget/domain/interface/budget.service.interface'

describe('BudgetController', () => {
  let controller: BudgetController

  const mockBudgetService = {
    createBudget: jest.fn(),
    updateBudget: jest.fn(),
    recommendBudget: jest.fn(),
  }

  const mockRequest = {
    user: { id: 'fadc33cf-4361-4385-8528-424402a0e9f1' },
    headers: {},
    ip: '127.0.0.1',
  } as unknown as Request

  const mockBudgetBody = {
    userId: mockRequest.user.id,
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

  const mockRecommendBudget = {
    userId: mockRequest.user.id,
    month: '2023-11',
    total: 2000000,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [{ provide: IBUDGET_SERVICE, useValue: mockBudgetService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockResolvedValue(true) })
      .compile()
    controller = module.get<BudgetController>(BudgetController)
  })
  it('should be defiend', () => {
    expect(controller).toBeDefined()
  })
  it('should create a budget', async () => {
    const userId = mockRequest.user.id

    const createBudgetMock = jest
      .spyOn(mockBudgetService, 'createBudget')
      .mockResolvedValue('createdBudget')

    const result = await controller.createBudget(mockRequest, mockBudgetBody)

    expect(createBudgetMock).toHaveBeenCalledWith({
      userId,
      ...mockBudgetBody,
    })

    expect(result).toEqual('createdBudget')
  })

  it('should update a budget', async () => {
    const userId = mockRequest.user.id

    const updateBudgetMock = jest
      .spyOn(mockBudgetService, 'updateBudget')
      .mockResolvedValue('updateBudget')

    const result = await controller.updateBudget(mockRequest, mockBudgetBody)

    expect(updateBudgetMock).toHaveBeenCalledWith({
      userId,
      ...mockBudgetBody,
    })

    expect(result).toEqual('updateBudget')
  })
  it('should return a recommendBudget', async () => {
    const userId = mockRequest.user.id

    const recommendBudgetMock = jest
      .spyOn(mockBudgetService, 'recommendBudget')
      .mockResolvedValue('recommendBudget')

    const result = await controller.getMonthlybudget(
      mockRequest,
      mockRecommendBudget,
    )

    expect(recommendBudgetMock).toHaveBeenCalledWith({
      userId,
      ...mockRecommendBudget,
    })

    expect(result).toEqual('recommendBudget')
  })
})
