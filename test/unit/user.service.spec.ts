import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '@user/app/user.service'
import { ReqRegisterAppDto } from '@user/domain/dto/register.app.dto'
import { ConflictException } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import {
  IUSER_REPOSITORY,
  ICACHE_SERVICE,
  IPASSWORD_HASHER,
} from '@common/constants/provider.constant'

describe('UserService', () => {
  let service: UserService

  const mockUserRepository = {
    findByEmail: jest.fn(),
    createUser: jest.fn().mockImplementation((email, hashedPassword) =>
      Promise.resolve({
        id: '2',
        email: 'email2',
        password: 'hashedPassword',
        createdAt: new Date(),
      }),
    ),
  }

  const mockPasswordHasher = {
    hashPassword: jest.fn(),
  }
  const mockLogger = {
    log: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: mockLogger,
        },
        {
          provide: IUSER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: ICACHE_SERVICE,
          useValue: {},
        },
        {
          provide: IPASSWORD_HASHER,
          useValue: mockPasswordHasher,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('register', async () => {
    const userDTO: ReqRegisterAppDto = {
      email: 'testUser@test.com',
      password: '1234@',
    }

    mockPasswordHasher.hashPassword.mockResolvedValue('hashedPassword')

    await service.register(userDTO)

    expect(mockUserRepository.findByEmail).toBeCalledWith(userDTO.email)
    expect(mockPasswordHasher.hashPassword).toBeCalledWith(userDTO.password)
    expect(mockUserRepository.createUser).toBeCalledWith(
      userDTO.email,
      'hashedPassword',
    )
  })

  it('register - should throw ConflictException if user already exists', async () => {
    const userDTO: ReqRegisterAppDto = {
      email: 'testUser@test.com',
      password: '1234@',
    }

    mockUserRepository.findByEmail.mockResolvedValueOnce(true)

    await expect(service.register(userDTO)).rejects.toThrow(ConflictException)
  })
})
