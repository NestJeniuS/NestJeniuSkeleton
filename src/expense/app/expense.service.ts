import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common'
import {
  ReqBudgetDto,
  ReqRecommendBudgetDto,
} from '@budget/domain/dto/budget.app.dto'
import { IEXPENSE_REPOSITORY } from '@common/constants/provider.constant'
import { IExpenseService } from '@expense/domain/interface/expense.service.interface'
import { IExpenseRepository } from '@expense/domain/interface/expense.repository.interface'
import {
  calculateBudget,
  calculateRecommendedBudget,
} from '@common/utils/budgetRecommend'
import {
  BUDGET_ALREADY_EXIST,
  BUDGET_NOTFOUND,
} from '@common/messages/budget/budget.error'

@Injectable()
export class ExpenseService implements IExpenseService {
  constructor(
    @Inject(IEXPENSE_REPOSITORY)
    private readonly expenseRepository: IExpenseRepository,
  ) {}

  async createBudget(req: ReqBudgetDto): Promise<string> {
    try {
      const yearMonth = new Date(req.month) // month는 문자열

      const existingBudget = await this.expenseRepository.findSameBudget(
        yearMonth,
        req.userId,
      )
      // 해당 달에 이미 예산이 있는지 확인
      if (Object.keys(existingBudget).length > 0) {
        throw new ConflictException(BUDGET_ALREADY_EXIST)
      } else {
        // Promise.all을 사용하여 모든 프로미스를 병렬로 해결
        await Promise.all(
          Object.entries(req.amount).map(async ([classification, budget]) => {
            await this.expenseRepository.createBudget(
              req.userId,
              yearMonth,
              Number(classification),
              budget,
            )
          }),
        )
        return '예산 설정에 성공하였습니다.'
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      } else {
        throw new InternalServerErrorException('예산 설정에 실패했습니다.')
      }
    }
  }

  async updateBudget(req: ReqBudgetDto): Promise<string> {
    try {
      const yearMonth = new Date(req.month)
      const existingBudget = await this.expenseRepository.findSameBudget(
        yearMonth,
        req.userId,
      )
      // 해당 달에 이미 예산이 있는지 확인
      if (Object.keys(existingBudget).length > 0) {
        await Promise.all(
          Object.entries(req.amount).map(async ([classification, budget]) => {
            await this.expenseRepository.updateBudget(
              req.userId,
              yearMonth,
              Number(classification),
              budget,
            )
          }),
        )
        return '예산 변경에 성공하였습니다.'
      } else {
        throw new NotFoundException(BUDGET_NOTFOUND)
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      } else {
        throw new InternalServerErrorException('예산 변경에 실패했습니다.')
      }
    }
  }

  async recommendBudget(req: ReqRecommendBudgetDto): Promise<object> {
    try {
      const yearMonth = new Date(req.month)
      const findBudgetRatio =
        await this.expenseRepository.getMonthlyBudgetRatio(yearMonth)

      const totalBudget = Number(req.total)

      let recommendedBudget = calculateRecommendedBudget(
        findBudgetRatio,
        (ratio: number) => calculateBudget(totalBudget, ratio),
      )

      return {
        message: '정상적으로 추천 예산이 생성되었습니다.',
        recommendedBudget,
      }
    } catch (error) {
      throw new InternalServerErrorException('추천예산 계산에 실패했습니다.')
    }
  }
}
