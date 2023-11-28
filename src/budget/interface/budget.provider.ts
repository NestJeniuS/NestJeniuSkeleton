import { BudgetService } from '@budget/app/budget.service'
import { BudgetRepository } from '@budget/infra/budgetRepository'
import { UserRepository } from '@user/infra/userRepository'
import {
  IBUDGET_REPOSITORY,
  IBUDGET_SERVICE,
  IUSER_REPOSITORY,
} from '@common/constants/provider.constant'

export const BudgetProvider = [
  {
    provide: IBUDGET_SERVICE,
    useClass: BudgetService,
  },
  {
    provide: IBUDGET_REPOSITORY,
    useClass: BudgetRepository,
  },
  // {
  //   provide: IUSER_REPOSITORY,
  //   useClass: UserRepository,
  // },
]
