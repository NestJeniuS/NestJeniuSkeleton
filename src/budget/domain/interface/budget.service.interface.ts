import { ReqBudgetDto } from '../dto/budget.app.dto'

export interface IBudgetService {
  createBudget(req: ReqBudgetDto): Promise<string>
  updateBudget(req: ReqBudgetDto): Promise<string>
}
