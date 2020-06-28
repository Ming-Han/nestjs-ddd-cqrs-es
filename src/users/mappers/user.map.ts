import { User } from '../domain/user.root';
import { UserName } from '../domain/userName.valueObject';

export class UserMap {
  public static toDomain(raw: any): [User, Error] {
    const [username, usernameError] = UserName.create({ name: raw.username });
    if (usernameError) {
      return [null, usernameError];
    }

    const [user, userError] = User.create({ username });
    if (userError) {
      return [null, userError];
    }

    return [user, null];
  }
}
