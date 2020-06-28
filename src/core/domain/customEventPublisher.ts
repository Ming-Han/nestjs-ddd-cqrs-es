import { Injectable } from '@nestjs/common';

import { EventBus, IEvent, AggregateRoot } from '@nestjs/cqrs';

export interface Constructor<T> {
  new (...args: any[]): T;
}

@Injectable()
export class CustomEventPublisher<EventBase extends IEvent = IEvent> {
  constructor(private readonly eventBus: EventBus<EventBase>) {}

  // mergeClassContext<T extends Constructor<AggregateRoot<EventBase>>>(
  //   metatype: T,
  // ): T {
  //   const eventBus = this.eventBus;
  //    class NewMetatype extends metatype {
  //     publish(event: EventBase) {
  //       eventBus.publish(event);
  //     }
  //   };
  //   console.log(metatype.);
  //   return NewMetatype
  // }

  // mergeObjectContext<T extends AggregateRoot<EventBase>>(object: T): T {
  //   const eventBus = this.eventBus;
  //   object.publish = (event: EventBase) => {
  //     eventBus.publish(event);
  //   };
  //   return object;
  // }
}
