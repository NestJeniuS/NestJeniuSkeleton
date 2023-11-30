import { ReqExpenseDto } from '../dto/expense.app.dto'

export interface IExpenseService {
  createExpense(req: ReqExpenseDto): Promise<string>
}
