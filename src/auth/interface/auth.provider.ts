import { AuthService } from '@auth/app/auth.service'
import { LocalStrategy } from '@auth/infra/passport/strategies/local.strategy'
import { TokenService } from '@auth/infra/token.sevice'
import {
  IAUTH_SERVICE,
  ITOKEN_SERVICE,
  IHANDLE_DATE_TIME,
} from '@common/constants/provider.constant'
import { HandleDateTime } from '@common/utils/handleDateTime'

export const AuthProvider = [
  LocalStrategy,
  {
    provide: ITOKEN_SERVICE,
    useClass: TokenService,
  },
  {
    provide: IAUTH_SERVICE,
    useClass: AuthService,
  },
  {
    provide: IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
]
