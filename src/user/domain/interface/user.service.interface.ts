import { ReqRegisterAppDto } from '../dto/register.app.dto'
import { User } from '../entity/user.entity'

export interface IUserService {
  register(user: ReqRegisterAppDto): Promise<User>

  //   getUser(req: ReqGetUserAppDto): Promise<ResGetUserAppDto>;

  //   updateUser(req: ReqUpdateUserAppDto): Promise<void>;

  //   deleteUser(req: ReqDeleteUserAppDto): Promise<void>;

  //   getUserList(req: ReqGetUserListAppDto): Promise<ResGetUserListAppDto[]>;
}
