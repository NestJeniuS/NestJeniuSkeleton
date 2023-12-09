import { ReqMonthlyDto } from '@expense/domain/dto/expense.app.dto'
import { UUID } from 'crypto'

export interface IRecommendationService {
  recommendExpenditure(req: ReqMonthlyDto): Promise<object>
  todayUsage(): Promise<object>
}
