import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import { ReqBudgetDto } from '@budget/domain/dto/budget.app.dto'
import { IBUDGET_SERVICE } from '@common/constants/provider.constant'
import { IBudgetService } from '@budget/domain/interface/budget.service.interface'
import { IBUDGET_REPOSITORY } from '@common/constants/provider.constant'
import { IBudgetRepository } from '@budget/domain/interface/budget.repository.interface'
import { plainToClass } from 'class-transformer'
import { UUID } from 'crypto'

@Injectable()
export class BudgetService implements IBudgetService {
  constructor(
    @Inject(IBUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
  ) {}

  async createBudget(req: ReqBudgetDto): Promise<string> {
    try {
      const yearMonth = new Date(req.month) // month는 문자열

      // 해당 달에 이미 예산이 있는지 확인
      const existingBudget = await this.budgetRepository.findSameBudget(
        yearMonth,
        req.userId,
      )

      if (existingBudget) {
        return '해당 달에 이미 예산이 존재합니다.'
      } else {
        // Promise.all을 사용하여 모든 프로미스를 병렬로 해결
        await Promise.all(
          Object.entries(req.amount).map(async ([classification, budget]) => {
            await this.budgetRepository.createBudget(
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
      console.log(error)
      throw new InternalServerErrorException('예산 설정에 실패했습니다.')
    }
  }

  async updateBudget(req: ReqBudgetDto): Promise<string> {
    try {
      const yearMonth = new Date(req.month)

      await Promise.all(
        Object.entries(req.amount).map(async ([classification, budget]) => {
          await this.budgetRepository.updateBudget(
            req.userId,
            yearMonth,
            Number(classification),
            budget,
          )
        }),
      )
      return '예산 변경에 성공하였습니다.'
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('예산 변경에 실패했습니다.')
    }
  }
}
