import { ReqExpenseDto } from '../dto/expense.app.dto'
import { Expense } from '../expense.entity'
import { UUID } from 'crypto'

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
}
