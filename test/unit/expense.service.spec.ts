import { Test, TestingModule } from '@nestjs/testing'
import { ExpenseService } from '@expense/app/expense.service'
import {
  IBUDGET_REPOSITORY,
  IEXPENSE_REPOSITORY,
  IHANDLE_DATE_TIME,
} from '@common/constants/provider.constant'
import { IExpenseRepository } from '@expense/domain/interface/expense.repository.interface'
import { IBudgetRepository } from '@budget/domain/interface/budget.repository.interface'
import { IHandleDateTime } from '@common/interfaces/IHandleDateTime'
import {
  ReqExpenseDto,
  ReqMonthlyDto,
} from '@expense/domain/dto/expense.app.dto'
import { Expense } from '@expense/infra/db/expense.entity'

describe('ExpenseService', () => {
  let service: ExpenseService
  let mockExpenseRepository: IExpenseRepository
  let mockBudgetRepository: IBudgetRepository
  let mockHandelDateTime: IHandleDateTime

  beforeEach(async () => {
    mockExpenseRepository = {
      createExpense: jest.fn(),
      getTotalMonthlyExpense: jest.fn(),
      getWeeklyExpense: jest.fn(),
      getAllExpense: jest.fn(),
      getTotalExpenseByClassification: jest.fn(),
      getExpense: jest.fn(),
    }

    mockBudgetRepository = {
      findBudgetByDate: jest.fn(),
      createBudget: jest.fn(),
      findSameBudget: jest.fn(),
      findMonthlyBudget: jest.fn(),
      updateBudget: jest.fn(),
      getMonthlyBudgetRatio: jest.fn(),
    }

    mockHandelDateTime = {
      getToday: jest.fn(),
      getYesterday: jest.fn(),
      getAWeekAgo: jest.fn(),
      getAMonthAgo: jest.fn(),
      getFewSecondsLater: jest.fn(),
      getFewHoursLater: jest.fn(),
      getFewDaysLater: jest.fn(),
      getDateString: jest.fn(),
      getADayAgoFromDate: jest.fn(),
      getYear: jest.fn(),
      getMonth: jest.fn(),
      getMonthDate: jest.fn(),
      getEndOfMonth: jest.fn(),
      getRemainingDays: jest.fn(),
      getYearMonth: jest.fn(),
      convertZonedDateTimeToDate: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: IEXPENSE_REPOSITORY, useValue: mockExpenseRepository },
        { provide: IBUDGET_REPOSITORY, useValue: mockBudgetRepository },
        { provide: IHANDLE_DATE_TIME, useValue: mockHandelDateTime },
      ],
    }).compile()
    service = module.get<ExpenseService>(ExpenseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create an expense', async () => {
    const mockReqExpenseDto = {
      classificationId: 1,
      userId: 'fadc33cf-4361-4385-8528-424402a0e9f1',
      amount: 15000,
      memo: '병원진료',
      exception: false,
      date: '2023-11-11',
    } as ReqExpenseDto

    const mockBudget = [{ id: 1 }]

    jest
      .spyOn(mockBudgetRepository, 'findBudgetByDate')
      .mockResolvedValue(mockBudget)

    await expect(service.createExpense(mockReqExpenseDto)).resolves.toEqual(
      '지출 설정에 성공하였습니다.',
    )
  })
  it('should get monthly expenses', async () => {
    const mockReqMonthlyDto = {
      userId: 'fadc33cf-4361-4385-8528-424402a0e9f1',
      month: '2023-11',
    } as ReqMonthlyDto

    const mockMonthlyExpenseResult = {
      '11월 총 지출': 100000,
      '11월 1주': 25000,
      '11월 2주': 30000,
      '11월 3주': 45000,
      '11월 4주': 0,
    }

    jest
      .spyOn(mockExpenseRepository, 'getTotalMonthlyExpense')
      .mockResolvedValue({ total: mockMonthlyExpenseResult['11월 총 지출'] })

    jest
      .spyOn(mockExpenseRepository, 'getWeeklyExpense')
      .mockResolvedValueOnce({
        totalExpense: mockMonthlyExpenseResult['11월 1주'],
      })
      .mockResolvedValueOnce({
        totalExpense: mockMonthlyExpenseResult['11월 2주'],
      })
      .mockResolvedValueOnce({
        totalExpense: mockMonthlyExpenseResult['11월 3주'],
      })
      .mockResolvedValueOnce({
        totalExpense: mockMonthlyExpenseResult['11월 4주'],
      })

    const result = await service.getMonthlyExpense(mockReqMonthlyDto)

    expect(result).toEqual(mockMonthlyExpenseResult)
  })

  // it('should get all expenses for a month', async () => {
  //   const mockReqMonthlyDto = {
  //     userId: 'fadc33cf-4361-4385-8528-424402a0e9f1',
  //     month: '2023-11',
  //   } as ReqMonthlyDto

  //   const mockExpenses = [
  //     {
  //       id: 9,
  //       date: '2023-11-11',
  //       amount: 15000,
  //       memo: '병원진료',
  //       exception: false,
  //       classification: { id: 13, classification: '의료/건강' },
  //     },
  //   ]

  //   jest.spyOn(mockExpenseRepository, 'getAllExpense')
  //   // .mockResolvedValue(mockExpenses)

  //   const result = await service.getAllExpense(mockReqMonthlyDto)

  //   expect(result).toHaveLength(mockExpenses.length)
  //   expect(result[0]).toHaveProperty('id', mockExpenses[0].id)
  //   expect(result[0]).toHaveProperty('date', mockExpenses[0].date)
  //   expect(result[0]).toHaveProperty('amount', mockExpenses[0].amount)
  //   expect(result[0]).toHaveProperty(
  //     'classification',
  //     mockExpenses[0].classification,
  //   )
  // })

  // it('should get an expense by id', async () => {
  //   const mockExpenseId = 1
  //   const mockUserId = 'fadc33cf-4361-4385-8528-424402a0e9f1'
  //   const mockExpense = {
  //     id: mockExpenseId,
  //     date: '2023-11-01',
  //     amount: 10000,
  //     classification: '식비',
  //   }

  //   jest
  //     .spyOn(mockExpenseRepository, 'getExpense')
  //     .mockResolvedValue(mockExpense)

  //   const result = await service.getExpense(mockExpenseId, mockUserId)

  //   expect(result).toEqual(mockExpense)
  // })

  // it('should get total expenses by classification for a month', async () => {
  //   const mockReqMonthlyDto = {
  //     userId: 'fadc33cf-4361-4385-8528-424402a0e9f1',
  //     month: '2023-11',
  //   }

  //   const mockTotalExpenses = [
  //     { classificationId: 1, total: '10000' },
  //     { classificationId: 2, total: '20000' },
  //   ]

  //   jest
  //     .spyOn(mockExpenseRepository, 'getTotalExpenseByClassification')
  //     .mockResolvedValue(mockTotalExpenses)

  //   const result =
  //     await service.getTotalExpenseByClassification(mockReqMonthlyDto)

  //   expect(result).toEqual(mockTotalExpenses)
  // })
})
