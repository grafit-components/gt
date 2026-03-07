import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationsService } from '@grafit/components';
import { NotificationProgressComponent } from './notification-progress/notification-progress.component';

@Component({
  selector: 'app-custom-component',
  imports: [],
  templateUrl: './custom-component.component.html',
  styleUrl: './custom-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomComponentComponent {
  private readonly notificationsService = inject(GtNotificationsService);

  protected addWithProgress() {
    this.notificationsService.add({
      head: 'Загрузка файла',
      text: 'Файл загружается...',
      component: NotificationProgressComponent,
      duration: 0,
    });
  }
}
