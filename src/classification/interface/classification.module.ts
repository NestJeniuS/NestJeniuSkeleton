import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from '@common/configs/jwt.config'
import { ConfigService } from '@nestjs/config'
import { Classification } from '@classification/domain/classification.entity'
import { ClassificationService } from '@classification/app/classification.service'
import { ClassificationController } from './classification.controller'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: jwtConfig(configService).accessTokenSecret,
        signOptions: {
          expiresIn: jwtConfig(configService).accessTokenExpiration,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Classification]),
  ],
  controllers: [ClassificationController],
  providers: [ClassificationService],
})
export class ClassificationModule {}
