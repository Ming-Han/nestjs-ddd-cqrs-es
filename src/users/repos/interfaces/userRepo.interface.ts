import { UserName } from 'src/users/domain/userName.valueObject';
import { User } from 'src/users/domain/user.root';

export interface IUserRepo {
  exists(username: UserName): Promise<[boolean, Error]>;
  getUserByUserName(username: UserName): Promise<[User, Error]>;
  save(user: User): Promise<[any, Error]>;
}
