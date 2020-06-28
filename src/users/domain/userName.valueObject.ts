import { ValueObject } from 'src/core/domain/valueObject';
import { Result } from 'src/core/result';

interface IUserName {
  name: string;
}

export class UserName extends ValueObject<IUserName> {
  public static maxLength = 15;
  public static minLength = 2;

  get value(): string {
    return this.props.name;
  }

  private constructor(props: IUserName) {
    super(props);
  }

  private static validation(name: string): [boolean, string] {
    if (name.length < UserName.minLength)
      return [true, `username is not at least ${UserName.minLength} chars`];

    if (name.length > UserName.maxLength)
      return [true, `username is greater than ${UserName.maxLength} chars.`];

    return [false, ''];
  }

  public static create(props: IUserName): [UserName, Error] {
    const [error, message] = UserName.validation(props.name);

    // if (error) return Result.fail<UserName>(message);

    // return Result.ok<UserName>(new UserName(props));

    if (error) return [null, new Error(message)];

    return [new UserName(props), null];
  }
}
