import { Budget } from '../budget.entity'
import { UUID } from 'crypto'
import { ResGetMonthlyBudgetDto } from '../dto/budget.app.dto'

export interface IBudgetRepository {
  createBudget(
    userId: UUID,
    month: Date,
    classification: number,
    amount: number,
  ): Promise<Budget>
  findSameBudget(month: Date, userId: UUID): Promise<object>
  findBudgetByDate(
    userId: UUID,
    classificationId: number,
    month: Date,
  ): Promise<object>
  findMonthlyBudget(
    userId: UUID,
    month: Date,
  ): Promise<ResGetMonthlyBudgetDto[]>
  // findTotalBudget(userId: UUID, month: Date)
  updateBudget(
    userId: UUID,
    month: Date,
    classification: number,
    amount: number,
  ): Promise<void>
  getMonthlyBudgetRatio(month: Date, userId: UUID): Promise<object>
}
