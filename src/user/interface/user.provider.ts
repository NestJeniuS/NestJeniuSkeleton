import { CacheService } from '@cache/cache.service'
import {
  ICACHE_SERVICE,
  IPASSWORD_HASHER,
  IUSER_REPOSITORY,
  IUSER_SERVICE,
} from '@common/constants/provider.constant'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { PasswordHasher } from '@common/passwordHasher'
import { UserService } from '@user/app/user.service'
import { UserRepository } from '@user/infra/userRepository'

export const UserProvider = [
  {
    provide: IUSER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: IUSER_SERVICE,
    useClass: UserService,
  },
  {
    provide: ICACHE_SERVICE,
    useClass: CacheService,
  },
  {
    provide: IPASSWORD_HASHER,
    useClass: PasswordHasher,
  },
  // {
  //   provide: WINSTON_MODULE_PROVIDER,
  //   useClass: Logger,
  // },
]
