import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationsService } from '@grafit/components';

@Component({
  selector: 'app-levels',
  imports: [],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent {
  private readonly notificationsService = inject(GtNotificationsService);

  protected addInfo() {
    this.notificationsService.add({
      head: 'Информация',
      text: 'Это информационное уведомление',
      level: 'info',
    });
  }

  protected addSuccess() {
    this.notificationsService.add({
      head: 'Успех',
      text: 'Операция выполнена успешно',
      level: 'success',
    });
  }

  protected addWarn() {
    this.notificationsService.add({
      head: 'Предупреждение',
      text: 'Обратите внимание на эту информацию',
      level: 'warn',
    });
  }

  protected addError() {
    this.notificationsService.add({
      head: 'Ошибка',
      text: 'Произошла ошибка при выполнении операции',
      level: 'error',
    });
  }
}
