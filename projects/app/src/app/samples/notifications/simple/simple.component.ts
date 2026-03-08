import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationService } from '@grafit/components';

@Component({
  selector: 'app-simple',
  imports: [],
  templateUrl: './simple.component.html',
  styleUrl: './simple.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleComponent {
  private readonly notificationService = inject(GtNotificationService);

  protected addNotification() {
    this.notificationService.add({
      head: 'Заголовок',
      text: 'Текст уведомления',
    });
  }
}
