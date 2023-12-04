import { UUID } from 'crypto'
import {
  ReqDetailExpenseDto,
  ReqExpenseDto,
  ReqMonthlyDto,
  ResDetailExpenseDto,
  ResGetExpenseDto,
} from '../dto/expense.app.dto'

export interface IExpenseService {
  createExpense(req: ReqExpenseDto): Promise<string>
  getMonthlyExpense(req: ReqMonthlyDto): Promise<object>
  getAllExpense(req: ReqMonthlyDto): Promise<ResGetExpenseDto[]>
  getExpense(id: number, userId: UUID): Promise<ResDetailExpenseDto>
  // updateExpense(req: ReqExpenseDto): Promise<string>
}
