import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationService } from '@grafit/components';

@Component({
  selector: 'app-levels',
  imports: [],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent {
  private readonly notificationService = inject(GtNotificationService);

  protected addInfo() {
    this.notificationService.add({
      head: 'Информация',
      text: 'Это информационное уведомление',
      level: 'info',
    });
  }

  protected addSuccess() {
    this.notificationService.add({
      head: 'Успех',
      text: 'Операция выполнена успешно',
      level: 'success',
    });
  }

  protected addWarn() {
    this.notificationService.add({
      head: 'Предупреждение',
      text: 'Обратите внимание на эту информацию',
      level: 'warn',
    });
  }

  protected addError() {
    this.notificationService.add({
      head: 'Ошибка',
      text: 'Произошла ошибка при выполнении операции',
      level: 'error',
    });
  }
}
