import { BudgetService } from '@budget/app/budget.service'
import { BudgetRepository } from '@budget/infra/budgetRepository'
import { UserRepository } from '@user/infra/userRepository'
import {
  IBUDGET_REPOSITORY,
  IBUDGET_SERVICE,
  IHANDLE_DATE_TIME,
  IUSER_REPOSITORY,
} from '@common/constants/provider.constant'
import { HandleDateTime } from '@common/utils/handleDateTime'

export const BudgetProvider = [
  {
    provide: IBUDGET_SERVICE,
    useClass: BudgetService,
  },
  {
    provide: IBUDGET_REPOSITORY,
    useClass: BudgetRepository,
  },
  {
    provide: IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
]
