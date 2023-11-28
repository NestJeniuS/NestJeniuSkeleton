import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Classification } from '../domain/classification.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(Classification)
    private classificationRepository: Repository<Classification>,
  ) {}

  async getClassificationList(): Promise<object[]> {
    try {
      const classificationList = await this.classificationRepository.find()

      return classificationList
    } catch (error) {
      throw new InternalServerErrorException(
        '카테고리 목록을 불러오는데 실패했습니다.',
      )
    }
  }
}
