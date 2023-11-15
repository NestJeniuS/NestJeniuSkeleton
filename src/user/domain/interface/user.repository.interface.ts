import { ReqRegisterDto } from '@user/interface/dto/registerUserDto'
import { User } from '../entity/user.entity'

export interface IUserRepository {
  createUser(email: string, password: string): Promise<User>

  findByEmail(email: string): Promise<ReqRegisterDto | null>

  // findById(id: string): Promise<User | null>

  // findPasswordById(userNickname: string): Promise<string>

  // changePassword(id: string, newPassword: string): Promise<void>

  // deleteUser(id: string): Promise<User>
}
