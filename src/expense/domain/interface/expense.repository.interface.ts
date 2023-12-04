import { ReqExpenseDto, ResDetailExpenseDto } from '../dto/expense.app.dto'
import { Expense } from '../expense.entity'
import { UUID } from 'crypto'
import { OAuthFlowObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

export interface IExpenseRepository {
  createExpense(
    userId: UUID,
    classificationId: number,
    budgetId: number,
    date: Date,
    amount: number,
    memo: string,
    exception: boolean,
  ): Promise<object>
  getTotalMonthlyExpense(userId: UUID, date: Date): Promise<object>
  getWeeklyExpense(userId: UUID, date: Date): Promise<object>
  getAllExpense(userId: UUID, date: Date): Promise<Expense[]>
  getExpense(userId: UUID, expenseId: number): Promise<ResDetailExpenseDto>
}
