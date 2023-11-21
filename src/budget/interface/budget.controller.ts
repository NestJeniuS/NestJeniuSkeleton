import { Controller, Body, Get, Post, Put, Inject } from '@nestjs/common'
import { IBudgetService } from '@budget/domain/interface/budget.service.interface'
import { IBUDGET_SERVICE } from '@common/constants/provider.constant'
import { ReqBudgetDto } from '@budget/domain/dto/createBudget.app.dto'

@Controller('budgets')
export class BudgetController {
  constructor(
    @Inject(IBUDGET_SERVICE)
    private readonly budegetService: IBudgetService,
  ) {}

  @Post()
  async create(@Body() budget: ReqBudgetDto): Promise<void> {
    await this.budegetService.createBudget(budget)
  }
}