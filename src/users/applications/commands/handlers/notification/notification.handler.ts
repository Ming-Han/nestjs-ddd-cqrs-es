import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { NotificationCommand } from '../../impl/notification.command';

@CommandHandler(NotificationCommand)
export class NotificationHandler
  implements ICommandHandler<NotificationCommand> {
  async execute(command: NotificationCommand) {
    const { message } = command;
    console.log(clc.cyanBright(`NotificationCommand...#${message}`));
  }
}
