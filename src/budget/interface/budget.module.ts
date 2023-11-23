import { Module } from '@nestjs/common'
import { BudgetController } from './budget.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { jwtConfig } from '@common/configs/jwt.config'
import { UserModule } from '@user/interface/user.module'
import { BudgetProvider } from './budget.provider'
import { Budget } from '@budget/domain/budget.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  controllers: [BudgetController],
  providers: [...BudgetProvider],
  exports: [...BudgetProvider],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Budget]),
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
export class BudgetModule {}
