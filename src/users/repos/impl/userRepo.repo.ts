import { IUserRepo } from '../interfaces/userRepo.interface';
import { User } from 'src/users/domain/user.root';
import { UserName } from 'src/users/domain/userName.valueObject';
import { Injectable } from '@nestjs/common';
import { UserMap } from 'src/users/mappers/user.map';

const mockDb = {};

@Injectable()
export class UserRepo implements IUserRepo {
  async save(user: User): Promise<[any, Error]> {
    try {
      mockDb[user.username.value] = {
        id: user.userId.id,
        username: user.username.value,
      };
      console.log('DB', mockDb);
      return [null, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getUserByUserName(username: UserName): Promise<[User, Error]> {
    try {
      const userData = mockDb[username.value];
      if (!userData) {
        throw new Error('User not found...');
      }

      const [user, userError] = UserMap.toDomain({
        id: userData.id,
        username: userData.username,
      });
      if (userError) return [null, userError];

      return [user, null];
    } catch (err) {
      return [null, err];
    }
  }

  async exists(username: UserName): Promise<[boolean, Error]> {
    const isExisted = !!mockDb[username.value];

    return [isExisted, null];
  }
}
