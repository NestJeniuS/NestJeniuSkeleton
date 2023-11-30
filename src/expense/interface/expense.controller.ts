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
} from '@nestjs/common'
import { IExpenseService } from '@expense/domain/interface/expense.service.interface'
import { IEXPENSE_SERVICE } from '@common/constants/provider.constant'
import { ReqExpenseDto } from '@expense/domain/dto/expense.app.dto'
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
}
