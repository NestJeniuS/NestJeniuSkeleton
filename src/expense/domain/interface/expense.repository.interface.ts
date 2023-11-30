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
}
