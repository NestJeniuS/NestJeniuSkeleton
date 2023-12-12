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
  IHANDLE_DATE_TIME,
  IRECOMMENDATION_SERVICE,
} from '@common/constants/provider.constant'
import { IExpenseRepository } from '@expense/domain/interface/expense.repository.interface'
import { IBudgetRepository } from '@budget/domain/interface/budget.repository.interface'
import { IRecommendationService } from '@expense/app/recommendation.service.interface'
import { UUID } from 'crypto'
import { ReqMonthlyDto } from '@expense/domain/dto/expense.app.dto'
import { IExpenseService } from '@expense/domain/interface/expense.service.interface'
import { Cron, CronExpression } from '@nestjs/schedule'
import { HttpService } from '@nestjs/axios'
import { payloads } from './webhook.payloads'
import { IHandleDateTime } from '@common/interfaces/IHandleDateTime'
import { ZonedDateTime, convert } from '@js-joda/core'

@Injectable()
export class RecommendationService implements IRecommendationService {
  constructor(
    private httpService: HttpService,
    @Inject(IEXPENSE_SERVICE)
    private readonly expenseService: IExpenseService,
    @Inject(IEXPENSE_REPOSITORY)
    private readonly expenseRepository: IExpenseRepository,
    @Inject(IBUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
    @Inject(IHANDLE_DATE_TIME)
    private readonly handleDateTime: IHandleDateTime,
  ) {}
  amountForm = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM, { name: 'recommendExpenditureTask' })
  async recommendExpenditure(req: ReqMonthlyDto): Promise<object> {
    try {
      const today = this.handleDateTime.getToday()

      const firstDayOfMonthZoned = this.handleDateTime.getYearMonth(req.month)

      const firstDayOfMonth =
        this.handleDateTime.convertZonedDateTimeToDate(firstDayOfMonthZoned)

      const endOfMonth = this.handleDateTime.getEndOfMonth(new Date(today))

      const remainingDays = this.handleDateTime.getRemainingDays(
        new Date(today),
        endOfMonth,
      )

      const budget = await this.budgetRepository.findMonthlyBudget(
        req.userId,
        firstDayOfMonth,
      )

      const webUrl = process.env.DISCORD_WEBHOOK_URL

      const expense = await this.expenseService.getTotalExpenseByClassification(
        { userId: req.userId, month: req.month },
      )

      // Budget과 Expense를 classificationId를 기준으로 하나의 객체에 합칩니다.
      const budgetExpenseMap = new Map()
      for (const b of budget) {
        budgetExpenseMap.set(b.classification.id, {
          budget: b.amount,
          expense: 0,
          classification: b.classification.classification,
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
      for (const [
        classificationId,
        { budget, expense, classification },
      ] of budgetExpenseMap) {
        const remainingBudget = budget - expense
        let dailyBudget
        if (remainingBudget > 0) {
          dailyBudget = Math.round(remainingBudget / remainingDays)
        } else {
          dailyBudget = 0 // 예산 초과 시 일일 권장 지출액을 0으로 설정
        }
        dailyRecommendedExpenditure.push({ classification, dailyBudget })
      }
      dailyRecommendedExpenditure.sort((a, b) =>
        a.classification > b.classification ? 1 : -1,
      )

      const payload = [
        {
          name: '오늘의 지출 추천',
          value: '',
          inline: true,
        },
      ]

      for (const key in dailyRecommendedExpenditure) {
        const item = dailyRecommendedExpenditure[key]
        payload[0].value += `${item.classification} : ${this.amountForm(
          item.dailyBudget,
        )}₩
        `
      }

      const message = payloads.MORNING_CONSULTING(payload)

      this.sendDiscord(webUrl, message)
      return dailyRecommendedExpenditure
    } catch (error) {
      throw new ConflictException('오늘의 지출 추천 불러오기에 실패 했습니다.')
    }
  }

  todayUsage(): Promise<object> {
    throw new Error('Method not implemented.')
  }

  async sendDiscord(discordUrl: string, data: object) {
    await this.httpService.post(discordUrl, data).subscribe({
      complete: () => {
        console.log('completed')
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
