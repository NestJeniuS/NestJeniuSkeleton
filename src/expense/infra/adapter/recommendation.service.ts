import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common'
import {
  IBUDGET_REPOSITORY,
  IEXPENSE_REPOSITORY,
  IEXPENSE_SERVICE,
  IRECOMMENDATION_SERVICE,
} from '@common/constants/provider.constant'
import { IExpenseRepository } from '@expense/domain/interface/expense.repository.interface'
import { IBudgetRepository } from '@budget/domain/interface/budget.repository.interface'
import { IRecommendationService } from '@expense/app/recommendation.service.interface'
import { UUID } from 'crypto'
import { ReqMonthlyDto } from '@expense/domain/dto/expense.app.dto'
import { IExpenseService } from '@expense/domain/interface/expense.service.interface'

@Injectable()
export class RecommendationService implements IRecommendationService {
  constructor(
    @Inject(IEXPENSE_SERVICE)
    private readonly expenseService: IExpenseService,
    @Inject(IEXPENSE_REPOSITORY)
    private readonly expenseRepository: IExpenseRepository,
    @Inject(IBUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
  ) {}
  async recommendExpenditure(req: ReqMonthlyDto): Promise<object> {
    try {
      const today = new Date()
      const firstDayOfMonth = new Date(req.month)
      //   console.log(firstDayOfMonth)
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      endOfMonth.setHours(23, 59, 59, 999) // Set the time to the end of the day
      const remainingDays =
        (endOfMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) // Calculate the difference in days
      const remainingDaysRounded = Math.ceil(remainingDays) // Round up to the nearest whole number

      const budget = await this.budgetRepository.findMonthlyBudget(
        req.userId,
        firstDayOfMonth,
      )
      const expense = await this.expenseService.getTotalExpenseByClassification(
        { userId: req.userId, month: req.month },
      )
      //   console.log(expense)
      //   console.log(remainingDaysRounded)
      //   console.log(budget)

      // Budget과 Expense를 classificationId를 기준으로 하나의 객체에 합칩니다.
      const budgetExpenseMap = new Map()
      for (const b of budget) {
        budgetExpenseMap.set(b.classification.id, {
          budget: b.amount,
          expense: 0,
        })
      }
      for (const e of expense) {
        if (budgetExpenseMap.has(e.classificationId)) {
          const be = budgetExpenseMap.get(e.classificationId)
          be.expense = Number(e.total)
        }
      }

      // 일일 추천 지출액을 계산합니다.
      const dailyRecommendedExpenditure = []
      for (const [classificationId, { budget, expense }] of budgetExpenseMap) {
        const remainingBudget = budget - expense
        let dailyBudget
        if (remainingBudget > 0) {
          dailyBudget = Math.round(remainingBudget / remainingDaysRounded)
        } else {
          dailyBudget = 0 // 예산 초과 시 일일 권장 지출액을 0으로 설정
        }
        dailyRecommendedExpenditure.push({ classificationId, dailyBudget })
      }
      dailyRecommendedExpenditure.sort(
        (a, b) => a.classificationId - b.classificationId,
      )
      console.log(dailyRecommendedExpenditure)
      return dailyRecommendedExpenditure
    } catch (error) {
      throw new Error('Method not implemented.')
    }
  }
  todayUsage(): Promise<object> {
    throw new Error('Method not implemented.')
  }
}
//카테고리 id별로 각각의budget과 expense의 차액을 remainingDaysRounded 남은일자로 나눈 값을 카테고리별로 구하고 싶어.
