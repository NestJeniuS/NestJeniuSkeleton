import { Injectable } from '@nestjs/common'
import { Budget } from '@budget/domain/budget.entity'
import { IBudgetRepository } from '@budget/domain/interface/budget.repository.interface'
import { plainToClass } from 'class-transformer'
import { Repository, DeepPartial } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UUID } from 'crypto'

@Injectable()
export class BudgetRepository implements IBudgetRepository {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  async createBudget(
    userId: UUID,
    month: Date,
    classification: number,
    amount: number,
  ): Promise<Budget> {
    // console.log('Received userId:', userId) // 로그 추가
    const result = await this.budgetRepository.save({
      user: { id: userId }, // user_id를 user 객체로 변경
      month,
      classification,
      amount,
    } as DeepPartial<Budget>) // 형변환 추가
    return plainToClass(Budget, result)
  }

  async findSameBudget(yearMonth: Date, userId: UUID): Promise<object> {
    const existingBudget = await this.budgetRepository.find({
      where: {
        month: yearMonth,
        user: { id: userId },
      },
    })
    return existingBudget
  }
  async updateBudget(
    userId: UUID,
    month: Date,
    classification: number,
    amount: number,
  ): Promise<void> {
    try {
      const existingBudget = await this.budgetRepository.findOne({
        where: {
          user: { id: userId },
          month,
          classification: { id: classification },
        },
      })

      if (existingBudget) {
        existingBudget.amount = amount
        await existingBudget.save()
      }
    } catch (error) {
      throw new Error(`Failed : ${error.message}`)
    }
  }
  async getMonthlyBudgetRatio(month: Date): Promise<object> {
    try {
      const query = this.budgetRepository
        .createQueryBuilder('budget')
        .select('budget.classification_id', 'classificationId')
        .addSelect('SUM(budget.amount)', 'totalBudget')
        .addSelect(
          'ROUND((CAST(SUM(budget.amount) AS NUMERIC) / (SELECT CAST(SUM(amount) AS NUMERIC) FROM budget WHERE month = :month)) * 100, 2)',
          'budgetRatio',
        )
        .where('budget.month = :month', { month }) // month 기준으로 필터링
        .groupBy('budget.classification_id')

      const categories = await query.getRawMany()

      const budgetRatio = categories.reduce(
        (acc, { classificationId, budgetRatio }) => {
          acc[classificationId] = parseFloat(budgetRatio)
          return acc
        },
        {},
      )

      return budgetRatio
    } catch (error) {
      throw new Error(`Failed : ${error.message}`)
    }
  }
}
