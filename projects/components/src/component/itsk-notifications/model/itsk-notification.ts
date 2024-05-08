import { ItskNotificationLevel } from './itsk-notification-level.enum';

export class ItskNotification {
  name: string | null | undefined;
  head: string | null | undefined;
  text: string | null | undefined;
  infinite: boolean = false;
  duration = 5000;
  className: string | string[] | null | undefined;
  level: ItskNotificationLevel = ItskNotificationLevel.Info;
  iconName: string | undefined;

  constructor(options?: {
    name?: string;
    head?: string;
    text?: string;
    infinite?: boolean;
    duration?: number;
    className?: string | string[];
    level?: ItskNotificationLevel;
    iconName?: string;
  }) {
    if (options) {
      this.name = options.name;
      this.head = options.head;
      this.text = options.text;
      this.infinite = options.infinite || false;
      this.className = options.className;
      this.level = options.level ? options.level : ItskNotificationLevel.Info;
      this.iconName = options.iconName;
      if (options.duration && options.duration > 0) {
        this.duration = options.duration;
      }
    }
  }
}
