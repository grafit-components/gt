import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationsService } from '@grafit/components';

@Component({
  selector: 'app-simple',
  imports: [],
  templateUrl: './simple.component.html',
  styleUrl: './simple.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleComponent {
  private readonly notificationsService = inject(GtNotificationsService);

  protected addNotification() {
    this.notificationsService.add({
      head: 'Заголовок',
      text: 'Текст уведомления',
    });
  }
}
