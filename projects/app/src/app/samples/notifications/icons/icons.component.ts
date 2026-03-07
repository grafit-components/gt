import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationsService } from '@grafit/components';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
  private readonly notificationsService = inject(GtNotificationsService);

  protected addInfo() {
    this.notificationsService.add({
      head: 'Новое сообщение',
      text: 'Вы получили новое сообщение',
      level: 'info',
      iconName: 'icon-send-airplane-message-filled',
    });
  }

  protected addWarn() {
    this.notificationsService.add({
      head: 'Истекает срок действия',
      text: 'Срок действия пароля истекает через 3 дня',
      level: 'warn',
      iconName: 'icon-attention_triangle-filled',
      iconClass: 'color_warning',
    });
  }
}
