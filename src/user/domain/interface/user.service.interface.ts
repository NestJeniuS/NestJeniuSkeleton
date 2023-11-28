import { ReqRegisterAppDto } from '../dto/register.app.dto'

export interface IUserService {
  register(user: ReqRegisterAppDto): Promise<void>

  //   getUser(req: ReqGetUserAppDto): Promise<ResGetUserAppDto>;

  //   updateUser(req: ReqUpdateUserAppDto): Promise<void>;

  //   deleteUser(req: ReqDeleteUserAppDto): Promise<void>;

  //   getUserList(req: ReqGetUserListAppDto): Promise<ResGetUserListAppDto[]>;
}
