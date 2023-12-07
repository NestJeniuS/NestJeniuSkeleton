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
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { IExpenseService } from '@expense/domain/interface/expense.service.interface'
import { IEXPENSE_SERVICE } from '@common/constants/provider.constant'
import {
  ReqClassificationExpenseDto,
  ReqDetailExpenseDto,
  ReqExpenseDto,
  ReqMonthlyDto,
  ResClassificationExpenseDto,
  ResDetailExpenseDto,
  ResGetExpenseDto,
} from '@expense/domain/dto/expense.app.dto'
import { JwtAuthGuard } from '@auth/infra/passport/guards/jwt.guard'
import { Request } from 'express'
import { config } from 'rxjs'

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(
    @Inject(IEXPENSE_SERVICE)
    private readonly expenseService: IExpenseService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async createExpense(
    @Req() req: Request,
    @Body() expense: ReqExpenseDto,
  ): Promise<string> {
    const userId = req.user.id
    const expenses = await this.expenseService.createExpense({
      userId,
      ...expense,
    })
    return expenses
  }

  @Get()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async getMonthlyExpense(
    @Req() req: Request,
    @Query() month: ReqMonthlyDto,
  ): Promise<object> {
    const userId = req.user.id
    const monthlyExpenses = await this.expenseService.getMonthlyExpense({
      userId,
      ...month,
    })
    return monthlyExpenses
  }

  @Get('classification')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async getTotalExpenseByClassification(
    @Req() req: Request,
  ): Promise<ResClassificationExpenseDto[]> {
    const userId = req.user.id
    const getTotalExpenseByClassification =
      await this.expenseService.getTotalExpenseByClassification(userId)
    return getTotalExpenseByClassification
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async getExpense(
    @Req() req: Request,
    @Param('id', ParseIntPipe) expenseId: number,
  ): Promise<ResDetailExpenseDto> {
    const userId = req.user.id
    const getExpense = await this.expenseService.getExpense(expenseId, userId)
    return getExpense
  }

  @Get('list')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async getAllExpense(
    @Req() req: Request,
    @Query() month: ReqMonthlyDto,
  ): Promise<ResGetExpenseDto[]> {
    const userId = req.user.id
    const getAllExpense = await this.expenseService.getAllExpense({
      userId,
      ...month,
    })
    return getAllExpense
  }

  // @Put()
  // @UsePipes(ValidationPipe)
  // @HttpCode(HttpStatus.OK)
  // async updateExpense(
  //   @Req() req: Request,
  //   @Body() expense: ReqExpenseDto,
  // ): Promise<string> {
  //   const userId = req.user.id
  //   const expenses = await this.expenseService.updateExpense({
  //     userId,
  //     ...expense,
  //   })
  //   return expenses
  // }
}
