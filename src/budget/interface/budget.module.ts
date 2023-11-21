import { Module } from '@nestjs/common'
import { BudgetController } from './budget.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { jwtConfig } from '@common/configs/jwt.config'
import { UserModule } from '@user/interface/user.module'
import { BudgetService } from '@budget/app/budget.service'

@Module({
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: jwtConfig(configService).accessTokenSecret,
        signOptions: {
          expiresIn: jwtConfig(configService).accessTokenExpiration,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
