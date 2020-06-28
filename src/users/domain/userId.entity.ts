import { Injectable } from '@nestjs/common';
import { Entity } from 'src/core/domain/entity';
import { UniqueEntityID } from 'src/core/domain/uniqueEntityID';
import { Result } from 'src/core/result';

@Injectable()
export class UserId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<UserId> {
    return Result.ok<UserId>(new UserId(id));
  }
}
