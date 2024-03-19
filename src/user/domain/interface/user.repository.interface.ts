import { ReqRegisterDto } from '@user/interface/dto/registerUserDto'
import { User } from '../entity/user.entity'
import { UUID } from 'crypto'
import { ReqUpdateUserAppDto } from '../dto/register.app.dto'

export interface IUserRepository {
  createUser(
    email: string,
    password: string,
    name: string,
    nickname: string,
    birthdate: Date,
    age: number,
    gender: string,
  ): Promise<User>

  findByEmail(email: string): Promise<User | null>

  findById(id: string): Promise<User | null>

  findPasswordById(id: string): Promise<string>

  updateUser(id: string, req: ReqUpdateUserAppDto): Promise<User>

  deleteUser(id: string): Promise<User>

  // changePassword(id: string, newPassword: string): Promise<void>
}
