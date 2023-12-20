import {
  HttpCode,
  Post,
  Body,
  Inject,
  HttpStatus,
  Controller,
} from '@nestjs/common'
import { ReqRegisterDto } from './dto/registerUserDto'
import { IUSER_SERVICE } from '@common/constants/provider.constant'
import { IUserService } from '@user/domain/interface/user.service.interface'

@Controller('users')
export class UserController {
  constructor(
    @Inject(IUSER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: ReqRegisterDto): Promise<void> {
    await this.userService.register(user)
  }
}
