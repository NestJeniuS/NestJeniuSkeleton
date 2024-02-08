import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '@auth/interface/auth.controller'
import {
  IAUTH_SERVICE,
  IHANDLE_DATE_TIME,
} from '@common/constants/provider.constant'
import { JwtAuthGuard } from '@auth/infra/passport/guards/jwt.guard'
import { LocalAuthGuard } from '@auth/infra/passport/guards/local.guard'
import { Request, Response } from 'express'
import * as useragent from 'useragent'

// useragent.parse 메서드를 모의합니다.
jest.mock('useragent', () => ({
  parse: jest.fn().mockReturnValue({
    os: { family: 'Windows', major: '10', minor: '0', patch: '0' },
    browser: 'Chrome',
    platform: 'Windows',
    version: '96.0.4664',
  }),
}))

describe('AuthController', () => {
  let controller: AuthController

  const mockAuthService = {
    login: jest.fn(),
    logout: jest.fn(),
    refresh: jest.fn(),
    checkPassword: jest.fn(),
  }

  const mockHandleDateTime = {
    getFewHoursLater: jest.fn(),
    getFewDaysLater: jest.fn(),
  }

  const mockRequest = {
    user: { id: '1' },
    headers: {},
    ip: '127.0.0.1',
  } as unknown as Request

  const mockResponse = {
    cookie: jest.fn(),
    send: jest.fn(),
    clearCookie: jest.fn(),
  } as unknown as Response

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: IAUTH_SERVICE, useValue: mockAuthService },
        { provide: IHANDLE_DATE_TIME, useValue: mockHandleDateTime },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockResolvedValue(true) })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: jest.fn().mockResolvedValue(true) })
      .compile()

    controller = module.get<AuthController>(AuthController)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should validate login', async () => {
    expect(await controller.validateLoggedIn()).toBe(true)
  })

  it('should login and set cookies', async () => {
    // Mocked data
    const accessToken = 'mockAccessToken'
    const refreshToken = 'mockRefreshToken'

    jest
      .spyOn(mockAuthService, 'login')
      .mockResolvedValue({ accessToken, refreshToken })

    // Call the login method
    await controller.login(mockRequest as Request, mockResponse as Response)

    expect(mockAuthService.login).toHaveBeenCalledWith({
      id: mockRequest.user.id,
      ip: mockRequest.ip,
      device: {
        browser: 'Chrome',
        platform: 'Windows',
        os: { family: 'Windows', major: '10', minor: '0', patch: '0' },
        version: '96.0.4664',
      },
    })

    // Check if cookies are set with correct values
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'accessToken',
      accessToken,
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      }),
    )
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'refreshToken',
      refreshToken,
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      }),
    )

    // Check if response is sent
    expect(mockResponse.send).toHaveBeenCalled()
  })

  it('should return true for a valid JWT token', async () => {
    const result = await controller.validateLoggedIn()
    expect(result).toBe(true)
  })

  it('should clear cookies and return status 204', async () => {
    await controller.logout(mockRequest, mockResponse)
    expect(mockResponse.clearCookie).toHaveBeenCalledWith('accessToken')
    expect(mockResponse.clearCookie).toHaveBeenCalledWith('refreshToken')
    expect(mockResponse.send).toHaveBeenCalled()
  })

  it('should call authService.checkPassword with the correct parameters', async () => {
    const passwordDto = { password: 'password123' }
    await controller.checkPassword(mockRequest, passwordDto)
    expect(mockAuthService.checkPassword).toHaveBeenCalledWith({
      id: mockRequest.user.id,
      password: passwordDto.password,
    })
  })
})
