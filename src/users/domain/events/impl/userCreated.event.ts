import { User } from '../../user.root';
import { IDomainEvent } from 'src/core/IDomainEvent.interface';
import { UniqueEntityID } from 'src/core/domain/uniqueEntityID';

export class UserCreatedEvent implements IDomainEvent {
  public readonly dateTimeOccured: Date;

  constructor(public readonly user: User) {
    this.dateTimeOccured = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
