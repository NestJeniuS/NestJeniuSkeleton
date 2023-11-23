import {
  Injectable,
  Inject,
  Logger,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import { ReqCreateBudgetDto } from '@budget/domain/dto/budget.app.dto'
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

  async createBudget(req: ReqCreateBudgetDto): Promise<string> {
    try {
      const dateObject = new Date(req.month) // month는 문자열
      // console.log('userid', req.userId)
      // 해당 달에 이미 예산이 있는지 확인
      const existingBudget =
        await this.budgetRepository.findSameBudget(dateObject)

      if (existingBudget) {
        return '해당 달에 이미 예산이 존재합니다.'
      }

      // Promise.all을 사용하여 모든 프로미스를 병렬로 해결
      const budgets = await Promise.all(
        Object.entries(req.amount).map(async ([classification, budget]) => {
          const result = await this.budgetRepository.createBudget(
            req.userId,
            dateObject,
            Number(classification),
            budget,
          )
        }),
      )
      return '예산 설정에 성공하였습니다.'
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('예산 설정에 실패했습니다.')
    }
  }
}
