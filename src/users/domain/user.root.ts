import { UserName } from './userName.valueObject';
import { UserId } from './userId.entity';
import { AggregateRoot } from 'src/core/domain/aggregareRoot';
import { UniqueEntityID } from 'src/core/domain/uniqueEntityID';
import { UserCreatedEvent } from './events/impl/userCreated.event';

interface IUser {
  username: UserName;
}

export class User extends AggregateRoot<IUser> {
  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get username(): UserName {
    return this.props.username;
  }

  constructor(props: IUser, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IUser, id?: UniqueEntityID): [User, Error] {
    const user = new this(props, id);
    user.apply(new UserCreatedEvent(user));

    return [user, null];
  }
}
