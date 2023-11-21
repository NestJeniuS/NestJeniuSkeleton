import { Controller, Get } from '@nestjs/common'
import { ClassificationService } from '../app/classification.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('카테고리')
@Controller('classifications')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}
  @ApiOperation({
    summary: '카테고리 조회',
    description: '카테고리를 조회합니다.',
  })
  @Get()
  async getClassificationList(): Promise<object[]> {
    return await this.classificationService.getClassificationList()
  }
}
