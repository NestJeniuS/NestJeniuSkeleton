import { UUID } from 'crypto'
import { ReqCreateBudgetDto, ResCreateBudgetDto } from '../dto/budgetDto'

export interface IBudgetService {
  createBudget(req: ReqCreateBudgetDto): Promise<string>
}
