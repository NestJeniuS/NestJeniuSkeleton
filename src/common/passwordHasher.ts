import { Injectable } from '@nestjs/common'
import { IPasswordHasher } from '@common/interfaces/IPasswordHasher'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class PasswordHasher implements IPasswordHasher {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
