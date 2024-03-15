import {
  HttpCode,
  Post,
  Body,
  Inject,
  HttpStatus,
  Controller,
  Response,
} from '@nestjs/common'
import { ReqRegisterDto } from './dto/registerUserDto'
import { IUSER_SERVICE } from '@common/constants/provider.constant'
import { IUserService } from '@user/domain/interface/user.service.interface'
import { User } from '@user/domain/entity/user.entity'

@Controller('users')
export class UserController {
  constructor(
    @Inject(IUSER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: ReqRegisterDto, @Response() res): Promise<User> {
    // res.status(201).json({ message: '계정 생성에 성공하였습니다.' })
    return await this.userService.register(user)
  }
}
