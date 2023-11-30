import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common'
import { ReqExpenseDto } from '@expense/domain/dto/expense.app.dto'
import {
  IBUDGET_REPOSITORY,
  IEXPENSE_REPOSITORY,
} from '@common/constants/provider.constant'
import { IExpenseService } from '@expense/domain/interface/expense.service.interface'
import { IExpenseRepository } from '@expense/domain/interface/expense.repository.interface'
import { IBudgetRepository } from '@budget/domain/interface/budget.repository.interface'

@Injectable()
export class ExpenseService implements IExpenseService {
  constructor(
    @Inject(IEXPENSE_REPOSITORY)
    private readonly expenseRepository: IExpenseRepository,
    @Inject(IBUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
  ) {}

  async createExpense(req: ReqExpenseDto): Promise<string> {
    try {
      const classificationId = req.classificationId
      const userId = req.userId
      const amount = req.amount
      const memo = req.memo
      const exception = req.exception

      const date = new Date(req.date)
      const year = date.getFullYear() // 년도를 가져옵니다.
      const month = date.getMonth() // getMonth()는 0부터 시작하므로 month+1을 해주지 않습니다.

      // 연도와 월을 설정한 새 Date 객체를 생성합니다.
      const monthDate = new Date(year, month)

      //   console.log(monthDate, 1)

      const budget = await this.budgetRepository.findBudgetByDate(
        userId,
        classificationId,
        monthDate,
      )
      let budgetId: number

      if (Object.keys(budget).length > 0) {
        // 배열이 비어있지 않은지 확인합니다.
        budgetId = budget[0].id
        console.log(budgetId)
      } else {
        console.log('예산을 찾을 수 없습니다.')
      }
      await this.expenseRepository.createExpense(
        userId,
        classificationId,
        budgetId,
        date,
        amount,
        memo,
        exception,
      )

      //   console.log(1)
      return '지출 설정에 성공하였습니다.'
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      } else {
        throw new InternalServerErrorException('지출 설정에 실패했습니다.')
      }
    }
  }
}
