import { AggregateRoot as Root } from '@nestjs/cqrs';
import { UniqueEntityID } from './uniqueEntityID';

export abstract class AggregateRoot<T> extends Root {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  get id(): UniqueEntityID {
    return this._id;
  }

  constructor(props: T, id?: UniqueEntityID) {
    super();
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: AggregateRoot<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}

const isEntity = (v: any): v is AggregateRoot<any> => {
  return v instanceof AggregateRoot;
};
