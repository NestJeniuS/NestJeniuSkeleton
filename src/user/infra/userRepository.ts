import { Injectable } from '@nestjs/common'
import { IUserRepository } from '@user/domain/interface/user.repository.interface'
import { User } from '../domain/entity/user.entity'
import { ReqRegisterDto } from '../interface/dto/registerUserDto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'
import { CustomRepository } from '@common/decorators/typeorm-ex.decorator'
import { UUID } from 'crypto'

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

  async findByEmail(email: string): Promise<User> {
    try {
      // console.log(User)
      // console.log(2, email)
      const user = await this.userRepository.findOne({ where: { email } })
      // console.log(user)
      return plainToClass(User, user)
    } catch (error) {
      console.log(error)
    }
  }
  async findById(id: UUID): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
      return plainToClass(User, user)
    } catch (error) {
      console.log(error)
    }
  }

  async findPasswordById(id: UUID): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['password'],
    })
    return user.password
  }
}
