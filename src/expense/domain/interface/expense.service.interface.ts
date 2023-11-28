import { ReqBudgetDto, ReqRecommendBudgetDto } from '../dto/budget.app.dto'

export interface IExpenseService {
  createBudget(req: ReqBudgetDto): Promise<string>
  updateBudget(req: ReqBudgetDto): Promise<string>
  recommendBudget(req: ReqRecommendBudgetDto): Promise<object>
}
