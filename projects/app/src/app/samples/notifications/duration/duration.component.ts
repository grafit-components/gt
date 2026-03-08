import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationService } from '@grafit/components';

@Component({
  selector: 'app-duration',
  imports: [],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationComponent {
  private readonly notificationService = inject(GtNotificationService);

  protected addShort() {
    this.notificationService.add({
      head: 'Короткое уведомление',
      text: 'Исчезнет через 3 секунды',
      duration: 3,
    });
  }

  protected addNormal() {
    this.notificationService.add({
      head: 'Обычное уведомление',
      text: 'Исчезнет через 10 секунд (по умолчанию)',
      duration: 10,
    });
  }

  protected addLong() {
    this.notificationService.add({
      head: 'Долгое уведомление',
      text: 'Исчезнет через 30 секунд',
      duration: 30,
    });
  }

  protected addPersistent() {
    this.notificationService.add({
      head: 'Постоянное уведомление',
      text: 'Не исчезнет само (duration: 0)',
      duration: 0,
    });
  }
}
