import { ReqBudgetDto } from '../dto/createBudget.app.dto'

export interface IBudgetService {
  createBudget(budget: ReqBudgetDto): Promise<void>
}
