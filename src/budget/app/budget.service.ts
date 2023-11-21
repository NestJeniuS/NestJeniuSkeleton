import {
  Injectable,
  Inject,
  Logger,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common'
import { ReqBudgetDto } from '@budget/domain/dto/createBudget.app.dto'
import { IBUDGET_SERVICE } from '@common/constants/provider.constant'
import { IBudgetService } from '@budget/domain/interface/budget.service.interface'

@Injectable()
export class BudgetService implements IBudgetService {
  constructor(
    @Inject(IBUDGET_SERVICE)
    private readonly budgetService: IBudgetService,
  ) {}

  async createBudget(budget: ReqBudgetDto): Promise<void> {}
}
