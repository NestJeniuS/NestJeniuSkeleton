import { Injectable } from '@nestjs/common'
import { IUserRepository } from '@user/domain/interface/user.repository.interface'
import { User } from '../domain/entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'
import { ReqUpdateUserAppDto } from '@user/domain/dto/register.app.dto'

// @CustomRepository(User)
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 유저 생성
  async createUser(
    email: string,
    password: string,
    name: string,
    nickname: string,
    birthdate: Date,
    age: number,
    gender: string,
  ): Promise<User> {
    const newUser = await this.userRepository.save({
      email,
      password,
      name,
      nickname,
      birthdate,
      age,
      gender,
    })
    return plainToClass(User, newUser)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } })
    return plainToClass(User, user)
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } })
    return plainToClass(User, user)
  }

  async findPasswordById(id: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['password'],
    })
    return user.password
  }

  async updateUser(id: string, req: ReqUpdateUserAppDto): Promise<User> {
    const updatedUser = await this.userRepository.save({ id, ...req })
    return updatedUser
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } })
    await this.userRepository.softDelete(id)
    return user
  }
}
