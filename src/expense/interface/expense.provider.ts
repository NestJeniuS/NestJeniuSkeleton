import { ExpenseService } from '@expense/app/expense.service'
import { ExpenseRepository } from '@expense/infra/db/expenses.repository'
import { UserRepository } from '@user/infra/userRepository'
import {
  IEXPENSE_REPOSITORY,
  IEXPENSE_SERVICE,
  IHANDLE_DATE_TIME,
  IRECOMMENDATION_SERVICE,
} from '@common/constants/provider.constant'
import { RecommendationService } from '@expense/infra/adapter/recommendation.service'
import { HandleDateTime } from '@common/utils/handleDateTime'

export const ExpenseProvider = [
  {
    provide: IEXPENSE_SERVICE,
    useClass: ExpenseService,
  },
  {
    provide: IEXPENSE_REPOSITORY,
    useClass: ExpenseRepository,
  },
  {
    provide: IRECOMMENDATION_SERVICE,
    useClass: RecommendationService,
  },
  {
    provide: IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
]
