import { Module } from '@nestjs/common'
import { ExpenseController } from './expense.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { jwtConfig } from '@common/configs/jwt.config'
import { UserModule } from '@user/interface/user.module'
import { ExpenseProvider } from './expense.provider'
import { Expense } from '@expense/infra/db/expense.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BudgetModule } from '@budget/interface/budget.module'
import { ScheduleModule } from '@nestjs/schedule'
import { HttpModule } from '@nestjs/axios'

@Module({
  controllers: [ExpenseController],
  providers: [...ExpenseProvider],
  exports: [...ExpenseProvider],
  imports: [
    BudgetModule,
    UserModule,
    TypeOrmModule.forFeature([Expense]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: jwtConfig(configService).accessTokenSecret,
        signOptions: {
          expiresIn: jwtConfig(configService).accessTokenExpiration,
        },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
})
export class ExpenseModule {}
