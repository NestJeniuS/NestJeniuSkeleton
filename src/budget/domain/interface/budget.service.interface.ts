import { ReqBudgetDto, ReqRecommendBudgetDto } from '../dto/budget.app.dto'

export interface IBudgetService {
  createBudget(req: ReqBudgetDto): Promise<string>
  updateBudget(req: ReqBudgetDto): Promise<string>
  recommendBudget(req: ReqRecommendBudgetDto): Promise<object>
}
