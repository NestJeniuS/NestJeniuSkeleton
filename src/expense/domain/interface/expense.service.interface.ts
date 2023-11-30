import { ReqExpenseDto, ReqMonthlyDto } from '../dto/expense.app.dto'

export interface IExpenseService {
  createExpense(req: ReqExpenseDto): Promise<string>
  getMonthlyExpense(req: ReqMonthlyDto): Promise<object>
  // updateExpense(req: ReqExpenseDto): Promise<string>
}
