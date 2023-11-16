import { ReqRegisterDto } from '@user/interface/dto/registerUserDto'
import { User } from '../entity/user.entity'
import { UUID } from 'crypto'

export interface IUserRepository {
  createUser(email: string, password: string): Promise<User>

  findByEmail(email: string): Promise<User | null>

  findById(id: string): Promise<User | null>

  findPasswordById(id: UUID): Promise<string>

  // changePassword(id: string, newPassword: string): Promise<void>

  // deleteUser(id: string): Promise<User>
}
