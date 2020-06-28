import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Repos } from './repos';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './applications/commands/handlers';
import { EventHandlers } from './domain/events/handlers';
import { UserSagas } from './domain/sagas/user.sagas';
import { QueryHandlers } from './applications/queries/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    ...Repos,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UserSagas,
  ],
})
export class UsersModule {}
