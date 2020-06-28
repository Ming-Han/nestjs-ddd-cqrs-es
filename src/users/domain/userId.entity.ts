import { Injectable } from '@nestjs/common';
import { Entity } from 'src/core/domain/entity';
import { UniqueEntityID } from 'src/core/domain/uniqueEntityID';

export class UserId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): [UserId, Error] {
    return [new UserId(id), null];
  }
}
