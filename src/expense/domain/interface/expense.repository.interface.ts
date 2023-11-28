import { Budget } from '../budget.entity'
import { UUID } from 'crypto'

export interface IExpenseRepository {
  createBudget(
    userId: UUID,
    month: Date,
    classification: number,
    amount: number,
  ): Promise<Budget>
  findSameBudget(month: Date, userId: UUID): Promise<object>
  updateBudget(
    userId: UUID,
    month: Date,
    classification: number,
    amount: number,
  ): Promise<void>
  getMonthlyBudgetRatio(month: Date): Promise<object>
}
