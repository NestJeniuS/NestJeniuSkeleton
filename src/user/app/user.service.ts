import {
  Inject,
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import {
  USER_ALREADY_EXIST,
  USER_NOT_FOUND,
} from '@common/messages/user/user.errors'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { IUserRepository } from '@user/domain/interface/user.repository.interface'
import { ICacheService } from '@cache/cache.service.interface'
import { ReqRegisterAppDto } from '@user/domain/dto/register.app.dto'
import { plainToClass } from 'class-transformer'
import {
  ICACHE_SERVICE,
  IPASSWORD_HASHER,
  IUSER_REPOSITORY,
} from '@common/constants/provider.constant'
import { IUserService } from '@user/domain/interface/user.service.interface'
import { IPasswordHasher } from '@common/interfaces/IPasswordHasher'
import { ConfigService } from '@nestjs/config'
import { REGISTER_SUCCESS_MESSAGE } from '@common/messages/user/user.messages'

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @Inject(IUSER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ICACHE_SERVICE)
    private readonly cacheService: ICacheService,
    @Inject(IPASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
    private readonly configService: ConfigService,
  ) {}

  async register(newUser: ReqRegisterAppDto): Promise<void> {
    const { email, password } = newUser
    console.log(newUser)

    console.log(email)
    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      throw new ConflictException(USER_ALREADY_EXIST)
    }
    console.log(4)

    const hashedPassword = await this.passwordHasher.hashPassword(password)

    const createdUser = await this.userRepository.createUser(
      email,
      hashedPassword,
    )

    this.logger.log(
      'info',
      `${REGISTER_SUCCESS_MESSAGE}-가입 이메일:${createdUser.email}, 유저 ID:${createdUser.id}, 가입 일시:${createdUser.createdAt}`,
    )
  }
}
