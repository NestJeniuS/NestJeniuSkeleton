import {
  ReqExpenseDto,
  ReqMonthlyDto,
  ResGetExpenseDto,
} from '../dto/expense.app.dto'

export interface IExpenseService {
  createExpense(req: ReqExpenseDto): Promise<string>
  getMonthlyExpense(req: ReqMonthlyDto): Promise<object>
  getAllExpense(req: ReqMonthlyDto): Promise<ResGetExpenseDto[]>
  // updateExpense(req: ReqExpenseDto): Promise<string>
}
