import { Injector, Type } from '@angular/core';

/** Конфигурация уведомления. */
export interface GtNotificationConfig {
  /** Заголовок уведомления. */
  head?: string;

  /** Текст уведомления. */
  text?: string;

  /** Уровень уведомления. По умолчанию 'ínfo'. */
  level?: 'info' | 'success' | 'warn' | 'error';

  /** Длительность отображения уведомления в секундах. По умолчанию 10. */
  duration?: number;
  className?: string | string[];

  /** Компонент, который будет добавлен к уведомлению */
  component?: Type<any>;
  /** Инжектор для компонента */
  injector?: Injector;

  iconName?: string;
  iconClass?: string | string[];
}
