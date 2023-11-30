import { ExpenseService } from '@expense/app/expense.service'
import { ExpenseRepository } from '@expense/infra/expenses.repository'
import { UserRepository } from '@user/infra/userRepository'
import {
  IEXPENSE_REPOSITORY,
  IEXPENSE_SERVICE,
  IBUDGET_REPOSITORY,
} from '@common/constants/provider.constant'
import { BudgetRepository } from '@budget/infra/budgetRepository'

export const ExpenseProvider = [
  {
    provide: IEXPENSE_SERVICE,
    useClass: ExpenseService,
  },
  {
    provide: IEXPENSE_REPOSITORY,
    useClass: ExpenseRepository,
  },
  // {
  //   provide: IBUDGET_REPOSITORY,
  //   useClass: BudgetRepository,
  // },
]
