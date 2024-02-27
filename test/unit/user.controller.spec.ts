import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from '@user/interface/user.controller'
import { ReqRegisterAppDto } from '@user/domain/dto/register.app.dto'
import { ConflictException } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import {
  IUSER_SERVICE,
  IUSER_REPOSITORY,
  ICACHE_SERVICE,
  IPASSWORD_HASHER,
} from '@common/constants/provider.constant'

describe('UserController', () => {
  let controller: UserController

  const mockUserService = {
    register: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {},
        },
        {
          provide: IUSER_REPOSITORY,
          useValue: {},
        },
        {
          provide: ICACHE_SERVICE,
          useValue: {},
        },
        {
          provide: IPASSWORD_HASHER,
          useValue: {},
        },
        {
          provide: IUSER_SERVICE,
          useValue: mockUserService,
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('register', async () => {
    const userDTO: ReqRegisterAppDto = {
      email: 'testUser@test.com',
      password: '1234@',
    }

    await controller.register(userDTO)

    expect(mockUserService.register).toBeCalledWith(userDTO)
  })

  it('register - should throw ConflictException if user already exists', async () => {
    const userDTO: ReqRegisterAppDto = {
      email: 'testUser@test.com',
      password: '1234@',
    }

    mockUserService.register.mockRejectedValue(new ConflictException())

    await expect(controller.register(userDTO)).rejects.toThrow(
      ConflictException,
    )
  })
})
