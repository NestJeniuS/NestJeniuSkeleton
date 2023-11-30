import { Injectable } from '@nestjs/common'
import { Expense } from '@expense/domain/expense.entity'
import { IExpenseRepository } from '@expense/domain/interface/expense.repository.interface'
import { plainToClass } from 'class-transformer'
import { Repository, DeepPartial, QueryFailedError } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UUID } from 'crypto'
import { ReqExpenseDto } from '@expense/domain/dto/expense.app.dto'

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async createExpense(
    userId: UUID,
    classificationId: number,
    budgetId: number,
    date: Date,
    amount: number,
    memo: string,
    exception: boolean,
  ): Promise<object> {
    // console.log(budgetId)
    try {
      const result = await this.expenseRepository.save({
        user: { id: userId },
        classification: { id: classificationId },
        budget: { id: budgetId },
        date,
        amount,
        memo,
        exception,
      })
      console.log(result)
      return result
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log('실행된 쿼리:', error.query) // 실패한 쿼리를 출력합니다.
        console.log('사용된 매개변수:', error.parameters) // 쿼리에 사용된 매개변수를 출력합니다.
      }
      console.error('Expense 생성 중 오류가 발생했습니다:', error)
      throw error
    }
  }
}
