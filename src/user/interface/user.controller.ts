import {
  HttpCode,
  Post,
  Body,
  Inject,
  HttpStatus,
  Controller,
  Response,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common'
import { ReqRegisterDto, ReqUpdateDto } from './dto/registerUserDto'
import { IUSER_SERVICE } from '@common/constants/provider.constant'
import { IUserService } from '@user/domain/interface/user.service.interface'
import { User } from '@user/domain/entity/user.entity'
import { Request } from 'express'
import { JwtAuthGuard } from '@auth/infra/passport/guards/jwt.guard'

@Controller('users')
export class UserController {
  constructor(
    @Inject(IUSER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: ReqRegisterDto, @Response() res): Promise<User> {
    return await this.userService.register(user)
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: Request,
    @Body() user: ReqUpdateDto,
  ): Promise<object> {
    const userId = req.user.id
    return await this.userService.updateUser(userId, user)
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async delete(@Req() req: Request): Promise<object> {
    const userId = req.user.id
    return await this.userService.deleteUser(userId)
  }
}
