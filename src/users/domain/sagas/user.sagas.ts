import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { UserCreatedEvent } from '../events/impl/userCreated.event';
import { NotificationCommand } from 'src/users/applications/commands/impl/notification.command';

@Injectable()
export class UserSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(event => {
        console.log(clc.redBright('Inside [UserSagas] Saga'));
        return new NotificationCommand(
          'Send the notification after the user has been created',
        );
      }),
    );
  };
}
