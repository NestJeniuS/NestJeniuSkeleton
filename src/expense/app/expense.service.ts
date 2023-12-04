import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common'
import {
  ReqDetailExpenseDto,
  ReqExpenseDto,
  ReqMonthlyDto,
  ResDetailExpenseDto,
  ResGetExpenseDto,
} from '@expense/domain/dto/expense.app.dto'
import {
  IBUDGET_REPOSITORY,
  IEXPENSE_REPOSITORY,
} from '@common/constants/provider.constant'
import { IExpenseService } from '@expense/domain/interface/expense.service.interface'
import { IExpenseRepository } from '@expense/domain/interface/expense.repository.interface'
import { IBudgetRepository } from '@budget/domain/interface/budget.repository.interface'
import { UUID } from 'crypto'

@Injectable()
export class ExpenseService implements IExpenseService {
  constructor(
    @Inject(IEXPENSE_REPOSITORY)
    private readonly expenseRepository: IExpenseRepository,
    @Inject(IBUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
  ) {}

  async createExpense(req: ReqExpenseDto): Promise<string> {
    const {
      classificationId,
      userId,
      amount,
      memo,
      exception,
      date: reqDate,
    } = req
    const date = new Date(reqDate)
    const year = date.getFullYear()
    const month = date.getMonth()

    const monthDate = new Date(year, month)

    try {
      const budget = await this.budgetRepository.findBudgetByDate(
        userId,
        classificationId,
        monthDate,
      )

      if (!budget || Object.keys(budget).length === 0) {
        console.log('예산을 찾을 수 없습니다.')
        return
      }

      const budgetId = budget[0].id

      await this.expenseRepository.createExpense(
        userId,
        classificationId,
        budgetId,
        date,
        amount,
        memo,
        exception,
      )
      return '지출 설정에 성공하였습니다.'
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      } else {
        throw new InternalServerErrorException('지출 설정에 실패했습니다.')
      }
    }
  }
  async getMonthlyExpense(req: ReqMonthlyDto): Promise<object> {
    try {
      const yearMonth = new Date(req.month) // month는 문자열
      const month = yearMonth.getMonth() + 1 // JavaScript에서 월은 0부터 시작하므로 1을 더해주어야 합니다.
      //   console.log(month)
      const totalMonthlyExpenseResult =
        await this.expenseRepository.getTotalMonthlyExpense(
          req.userId,
          yearMonth,
        )
      //   console.log(totalMonthlyExpenseResult)

      const totalWeeklyExpenseResult =
        await this.expenseRepository.getWeeklyExpense(req.userId, yearMonth)
      //   console.log(totalWeeklyExpenseResult)
      // 결과를 저장할 객체를 초기화합니다.
      //   console.log(totalWeeklyExpenseResult[0], 1)
      let result = {}
      //   console.log('result initialized', result)
      // 월간 총 지출을 객체에 추가합니다.
      result[`${month}월 총 지출`] = Number(totalMonthlyExpenseResult['total'])
      //   console.log('result after adding total expense', result)

      //   //   주간 지출을 객체에 추가합니다.
      Object.entries(totalWeeklyExpenseResult).forEach(([key, item], index) => {
        console.log(`item for week ${index + 1}:`, item)
        result[`${month}월 ${index + 1}주`] = Number(item['totalExpense'])
      })

      return result
    } catch (error) {
      throw new InternalServerErrorException(
        '한달 지출 금액 불러오기에 실패했습니다.',
      )
    }
  }

  async getAllExpense(req: ReqMonthlyDto): Promise<ResGetExpenseDto[]> {
    try {
      const yearMonth = new Date(req.month)
      const expenses = await this.expenseRepository.getAllExpense(
        req.userId,
        yearMonth,
      )

      const result = expenses.map((expense) => ({
        id: expense.id,
        date: expense.date,
        amount: expense.amount,
        classification: expense.classification.classification,
      }))

      return result
    } catch (error) {
      // error handling
    }
  }

  async getExpense(id: number, userId: UUID): Promise<ResDetailExpenseDto> {
    try {
      console.log(id)
      const result = await this.expenseRepository.getExpense(userId, id)
      return result
    } catch (error) {
      throw new InternalServerErrorException(
        '상세지출 내역 가져오기에 실패했습니다.',
      )
    }
  }

  //   async updateExpense(req: ReqExpenseDto): Promise<string> {
  //     try {
  //         const {
  //             classificationId,
  //             userId,
  //             amount,
  //             memo,
  //             exception,
  //             date: reqDate,
  //           } = req
  //           const date = new Date(reqDate)

  //     }

  //   }
}
