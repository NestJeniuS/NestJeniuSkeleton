import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
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
  async register(@Body() user: ReqRegisterDto): Promise<void> {
    await this.userService.register(user)
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll()
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id)
  // }
}
