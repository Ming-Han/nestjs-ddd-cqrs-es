import { UniqueEntityID } from './domain/uniqueEntityID';

export interface IDomainEvent {
  dateTimeOccured: Date;
  getAggregateId(): UniqueEntityID;
}
