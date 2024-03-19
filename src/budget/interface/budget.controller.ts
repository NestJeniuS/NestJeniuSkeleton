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
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common'
import { IBudgetService } from '@budget/domain/interface/budget.service.interface'
import { IBUDGET_SERVICE } from '@common/constants/provider.constant'
import {
  ReqBudgetDto,
  ReqRecommendBudgetDto,
} from '@budget/domain/dto/budget.app.dto'
import { JwtAuthGuard } from '@auth/infra/passport/guards/jwt.guard'
import { Request } from 'express'

@Controller('budgets')
@UseGuards(JwtAuthGuard)
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
    @Body() budget: ReqBudgetDto,
  ): Promise<string> {
    const userId = req.user.id
    const budgets = await this.budegetService.createBudget({
      userId,
      ...budget,
    })

    return budgets
  }

  @Put()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async updateBudget(
    @Req() req: Request,
    @Body() budget: ReqBudgetDto,
  ): Promise<string> {
    const userId = req.user.id
    const budgets = await this.budegetService.updateBudget({
      userId,
      ...budget,
    })
    return budgets
  }

  @Get()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async getMonthlybudget(
    @Req() req: Request,
    @Query() totalBudget: ReqRecommendBudgetDto,
  ): Promise<object> {
    const userId = req.user.id
    const recommendBudget = await this.budegetService.recommendBudget({
      userId,
      ...totalBudget,
    })
    return recommendBudget
  }
}
