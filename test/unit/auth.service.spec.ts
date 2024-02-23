import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../../src/auth/app/auth.service'
import {
  ICACHE_SERVICE,
  IPASSWORD_HASHER,
  ITOKEN_SERVICE,
  IUSER_REPOSITORY,
} from '@common/constants/provider.constant'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { ReqLoginAppDto } from '@auth/domain/dto/login.app.dto'
import { ResValidateUserAppDto } from '@auth/domain/dto/vaildateUser.app.dto'

describe('AuthService', () => {
  let service: AuthService

  const mockUserRepository = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    findPasswordById: jest.fn(),
  }

  const mockPasswordHasher = {
    comparePassword: jest.fn(),
  }

  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
  }

  const mockCacheService = {
    getFromCache: jest.fn().mockResolvedValue({
      refreshToken: 'validRefreshToken',
      ip: '127.0.0.1',
      device: {},
    }),
    setCache: jest.fn(),
    deleteCache: jest.fn(),
  }

  const mockTokenService = {
    decodeToken: jest
      .fn()
      .mockResolvedValue({ id: '123e4567-e89b-12d3-a456-426614174000' }),
    generateAccessToken: jest.fn().mockResolvedValue('testToken'),
    generateRefreshToken: jest.fn().mockResolvedValue('testToken'),
  }

  const vaildateUser: ResValidateUserAppDto = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@test.com',
    createdAt: new Date(),
  }
  const mockUser: ReqLoginAppDto = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    ip: '127.0.0.1',
    device: {
      browser: 'Chrome',
      platform: 'Windows',
      version: '89',
    },
  }

  const mockDevice = {
    browser: 'Chrome',
    platform: 'Windows',
    version: '89',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ITOKEN_SERVICE,
          useValue: mockTokenService,
        },
        {
          provide: IUSER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: mockLogger,
        },
        {
          provide: ICACHE_SERVICE,
          useValue: mockCacheService,
        },
        {
          provide: IPASSWORD_HASHER,
          useValue: mockPasswordHasher,
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return user if credentials are valid', async () => {
    const mockPassword = 'hashedPassword'
    mockUserRepository.findByEmail.mockResolvedValue(mockUser)
    mockUserRepository.findPasswordById.mockResolvedValue(mockPassword)
    mockPasswordHasher.comparePassword.mockResolvedValue(true)

    const result = await service.validateUser({
      email: mockUser.id,
      password: 'password',
    })
    expect(result).toEqual(mockUser)
  })

  it('should throw an error if user does not exist', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null)

    await expect(
      service.validateUser({ email: 'test@test.com', password: 'password' }),
    ).rejects.toThrow()
  })

  it('should throw an error if password is incorrect', async () => {
    const mockUser = { id: 1, email: 'test@test.com' }
    const mockPassword = 'hashedPassword'
    mockUserRepository.findByEmail.mockResolvedValue(mockUser)
    mockUserRepository.findPasswordById.mockResolvedValue(mockPassword)
    mockPasswordHasher.comparePassword.mockResolvedValue(false)

    await expect(
      service.validateUser({
        email: mockUser.email,
        password: 'wrongpassword',
      }),
    ).rejects.toThrow()
  })

  // login 테스트
  it('should return token if credentials are valid', async () => {
    const mockToken = 'testToken'
    mockUserRepository.findByEmail.mockResolvedValue(mockUser)
    mockTokenService.generateAccessToken.mockResolvedValue(mockToken)
    mockTokenService.generateRefreshToken.mockResolvedValue(mockToken)

    const result = await service.login(mockUser)
    expect(await result.accessToken).toEqual(mockToken)
    expect(await result.refreshToken).toEqual(mockToken)
  })

  // checkPassword 테스트
  it('should not throw an error if password is correct', async () => {
    const mockPassword = 'hashedPassword'
    mockUserRepository.findPasswordById.mockResolvedValue(mockPassword)
    mockPasswordHasher.comparePassword.mockResolvedValue(true)

    await expect(
      service.checkPassword({
        id: '123e4567-e89b-12d3-a456-426614174000',
        password: 'password',
      }),
    ).resolves.not.toThrow()
  })

  it('should throw an error if password is incorrect', async () => {
    const mockPassword = 'hashedPassword'
    mockUserRepository.findPasswordById.mockResolvedValue(mockPassword)
    mockPasswordHasher.comparePassword.mockResolvedValue(false)

    await expect(
      service.checkPassword({
        id: '123e4567-e89b-12d3-a456-426614174000',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow()
  })

  // logout 테스트
  it('should not throw an error', async () => {
    await expect(
      service.logout({ id: '123e4567-e89b-12d3-a456-426614174000' }),
    ).resolves.not.toThrow()
  })

  // refresh 테스트
  it('should return new access token if refresh token is valid', async () => {
    const validRefreshToken = 'validRefreshToken'
    const mockToken = 'newAccessToken'

    const decoded = mockTokenService.decodeToken(validRefreshToken)

    mockUserRepository.findById.mockResolvedValue({
      id: decoded.id,
      email: 'test@test.com',
    })

    mockCacheService.getFromCache.mockResolvedValue({
      refreshToken: validRefreshToken,
      ip: '127.0.0.1',
      device: mockDevice,
    })

    mockTokenService.generateAccessToken.mockResolvedValue(mockToken)

    const result = await service.refresh({
      refreshToken: validRefreshToken,
      ip: '127.0.0.1',
      device: mockDevice,
    })

    expect(result).toEqual({
      accessToken: mockToken,
    })
  })
})
