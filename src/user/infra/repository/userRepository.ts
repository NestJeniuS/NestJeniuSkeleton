import { Injectable } from '@nestjs/common'
import { IUserRepository } from '@user/domain/interface/user.repository.interface'
import { User } from '../../domain/entity/user.entity'
import { ReqRegisterDto } from '../../interface/dto/registerUserDto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'
import { CustomRepository } from '@common/decorator/typeorm-ex.decorator'

// @CustomRepository(User)
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 유저 생성
  async createUser(email: string, password: string): Promise<User> {
    // console.log(3)
    const newUser = await this.userRepository.save({ email, password })
    return plainToClass(User, newUser)
  }

  async findByEmail(email: string): Promise<ReqRegisterDto> {
    try {
      // console.log(User)
      // console.log(2, email)
      const user = await this.userRepository.findOne({ where: { email } })
      // console.log(user)
      return user
    } catch (error) {
      console.log(error)
    }
  }
}
