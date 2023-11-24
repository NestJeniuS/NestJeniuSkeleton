import { Budget } from '../budget.entity'
import { UUID } from 'crypto'

export interface IBudgetRepository {
  createBudget(
    userId: UUID,
    month: Date,
    classification: number,
    amount: Number,
  ): Promise<Budget>
  findSameBudget(month: Date, userId: UUID): Promise<Budget>
}
