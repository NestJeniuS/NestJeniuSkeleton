import { ReqCreateBudgetDto } from '../dto/budget.app.dto'

export interface IBudgetService {
  createBudget(req: ReqCreateBudgetDto): Promise<string>
}
