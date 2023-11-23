import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Inject,
  UseGuards,
  Req,
  HttpCode,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { IBudgetService } from '@budget/domain/interface/budget.service.interface'
import { IBUDGET_SERVICE } from '@common/constants/provider.constant'
import {
  ReqCreateBudgetDto,
  ResCreateBudgetDto,
} from '@budget/domain/dto/budgetDto'
import { JwtAuthGuard } from '@auth/infra/passport/guards/jwt.guard'
import { plainToClass } from 'class-transformer'
import { Request } from 'express'

@UseGuards(JwtAuthGuard)
@Controller('budgets')
export class BudgetController {
  constructor(
    @Inject(IBUDGET_SERVICE)
    private readonly budegetService: IBudgetService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async createBudget(
    @Req() req: Request,
    @Body() budget: ReqCreateBudgetDto,
  ): Promise<string> {
    const userId = req.user.id
    // console.log(userId)
    // console.log(budget)
    const budgets = await this.budegetService.createBudget({
      userId,
      ...budget,
    })
    return budgets
  }
}
