import { ReqRegisterAppDto, ReqUpdateUserAppDto } from '../dto/register.app.dto'
import { User } from '../entity/user.entity'

export interface IUserService {
  register(user: ReqRegisterAppDto): Promise<User>

  updateUser(userId: string, req: ReqUpdateUserAppDto): Promise<object>

  deleteUser(userId: string): Promise<object>
}
