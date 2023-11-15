import { Module } from '@nestjs/common'
import { AuthService } from '../app/auth.service'
import { AuthController } from './auth.controller'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
