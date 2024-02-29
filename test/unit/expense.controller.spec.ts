import { Test, TestingModule } from '@nestjs/testing'
import { ExpenseController } from '@expense/interface/expense.controller'
import {
  IEXPENSE_SERVICE,
  IRECOMMENDATION_SERVICE,
} from '@common/constants/provider.constant'
import { JwtAuthGuard } from '@auth/infra/passport/guards/jwt.guard'
import { IExpenseService } from '@expense/domain/interface/expense.service.interface'
import { IRecommendationService } from '@expense/app/recommendation.service.interface'
import { Request } from 'express'
import {
  ResClassificationExpenseDto,
  ResDetailExpenseDto,
  ResGetExpenseDto,
} from '@expense/domain/dto/expense.app.dto'

describe('ExpenseController', () => {
  let controller: ExpenseController
  let mockExpenseService: IExpenseService
  let mockRecommendationService: IRecommendationService

  beforeEach(async () => {
    mockExpenseService = {
      createExpense: jest.fn(),
      getMonthlyExpense: jest.fn(),
      getAllExpense: jest.fn(),
      getTotalExpenseByClassification: jest.fn(),
      getExpense: jest.fn(),
    }

    mockRecommendationService = {
      recommendExpenditure: jest.fn(),
      todayUsage: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        { provide: IEXPENSE_SERVICE, useValue: mockExpenseService },
        {
          provide: IRECOMMENDATION_SERVICE,
          useValue: mockRecommendationService,
        },
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

  it('should create an expense', async () => {
    const mockRequest: Request = {
      user: { id: 'fadc33cf-4361-4385-8528-424402a0e9f1' },
    } as unknown as Request

    const mockExpenseBody = {
      userId: mockRequest.user.id,
      amount: 15000,
      date: '2023-11-11',
      memo: '병원진료',
      exception: false,
      classificationId: 13,
    }

    const mockCreatedExpense: string = 'Created expense'

    jest
      .spyOn(mockExpenseService, 'createExpense')
      .mockResolvedValue(mockCreatedExpense)

    const result = await controller.createExpense(mockRequest, mockExpenseBody)

    expect(mockExpenseService.createExpense).toHaveBeenCalledWith({
      userId: mockRequest.user.id,
      ...mockExpenseBody,
    })
    expect(result).toEqual(mockCreatedExpense)
  })

  it('should get monthly expenses', async () => {
    const mockRequest: Request = {
      user: { id: 'fadc33cf-4361-4385-8528-424402a0e9f1' },
    } as unknown as Request

    const mockMonthlyDto = {
      userId: mockRequest.user.id,
      month: '2023-11',
    }

    const mockMonthlyExpenses: object = {} // Mock monthly expenses object

    jest
      .spyOn(mockExpenseService, 'getMonthlyExpense')
      .mockResolvedValue(mockMonthlyExpenses)

    const result = await controller.getMonthlyExpense(
      mockRequest,
      mockMonthlyDto,
    )

    expect(mockExpenseService.getMonthlyExpense).toHaveBeenCalledWith({
      userId: mockRequest.user.id,
      ...mockMonthlyDto,
    })
    expect(result).toEqual(mockMonthlyExpenses)
  })

  it('should get all expenses', async () => {
    const mockRequest: Request = {
      user: { id: 'fadc33cf-4361-4385-8528-424402a0e9f1' },
    } as unknown as Request

    const mockMonthlyDto = {
      userId: mockRequest.user.id,
      month: '2023-11',
    }

    const mockAllExpenses: ResGetExpenseDto[] = [] // Mock all expenses array

    jest
      .spyOn(mockExpenseService, 'getAllExpense')
      .mockResolvedValue(mockAllExpenses)

    const result = await controller.getAllExpense(mockRequest, mockMonthlyDto)

    expect(mockExpenseService.getAllExpense).toHaveBeenCalledWith({
      userId: mockRequest.user.id,
      ...mockMonthlyDto,
    })
    expect(result).toEqual(mockAllExpenses)
  })

  it('should get total expenses by classification', async () => {
    const mockRequest: Request = {
      user: { id: 'fadc33cf-4361-4385-8528-424402a0e9f1' },
    } as unknown as Request

    const mockMonthlyDto = {
      userId: mockRequest.user.id,
      month: '2023-11',
    }

    const mockClassificationExpenses: ResClassificationExpenseDto[] = [] // Mock classification expenses array

    jest
      .spyOn(mockExpenseService, 'getTotalExpenseByClassification')
      .mockResolvedValue(mockClassificationExpenses)

    const result = await controller.getTotalExpenseByClassification(
      mockRequest,
      mockMonthlyDto,
    )

    expect(
      mockExpenseService.getTotalExpenseByClassification,
    ).toHaveBeenCalledWith({
      userId: mockRequest.user.id,
      ...mockMonthlyDto,
    })
    expect(result).toEqual(mockClassificationExpenses)
  })

  it('should get an expense by ID', async () => {
    const mockRequest: Request = {
      user: { id: 'fadc33cf-4361-4385-8528-424402a0e9f1' },
    } as unknown as Request

    const mockExpenseId = 12345 // Mock expense ID

    const mockDetailExpense: ResDetailExpenseDto = {
      id: 1,
      date: undefined,
      amount: 2000,
      memo: '',
    } // Mock detail expense object

    jest
      .spyOn(mockExpenseService, 'getExpense')
      .mockResolvedValue(mockDetailExpense)

    const result = await controller.getExpense(mockRequest, mockExpenseId)

    expect(mockExpenseService.getExpense).toHaveBeenCalledWith(
      mockExpenseId,
      mockRequest.user.id,
    )
    expect(result).toEqual(mockDetailExpense)
  })

  it('should recommend expenditure', async () => {
    const mockRequest: Request = {
      user: { id: 'fadc33cf-4361-4385-8528-424402a0e9f1' },
    } as unknown as Request

    const mockMonthlyDto = {
      userId: mockRequest.user.id,
      month: '2023-11',
    }

    const mockRecommendationResult = {} // Mock recommendation result

    jest
      .spyOn(mockRecommendationService, 'recommendExpenditure')
      .mockResolvedValue(mockRecommendationResult)

    const result = await controller.getRecommendExpenditure(
      mockRequest,
      mockMonthlyDto,
    )

    expect(mockRecommendationService.recommendExpenditure).toHaveBeenCalledWith(
      {
        userId: mockRequest.user.id,
        ...mockMonthlyDto,
      },
    )
    expect(result).toEqual(mockRecommendationResult)
  })

  it('should get today usage', async () => {
    const mockRequest: Request = {
      user: { id: 'fadc33cf-4361-4385-8528-424402a0e9f1' },
    } as unknown as Request

    const mockMonthlyDto = {
      userId: mockRequest.user.id,
      month: '2023-11',
    }

    const mockTodayUsageResult = {} // Mock today usage result

    jest
      .spyOn(mockRecommendationService, 'todayUsage')
      .mockResolvedValue(mockTodayUsageResult)

    const result = await controller.getTodayUsage(mockRequest, mockMonthlyDto)

    expect(mockRecommendationService.todayUsage).toHaveBeenCalledWith({
      userId: mockRequest.user.id,
      ...mockMonthlyDto,
    })
    expect(result).toEqual(mockTodayUsageResult)
  })
})
