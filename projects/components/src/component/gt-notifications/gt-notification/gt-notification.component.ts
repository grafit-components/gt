import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ItskIconComponent } from '../../itsk-icon/itsk-icon/itsk-icon.component';
import { GtNotificationRef } from '../gt-notification.ref';

@Component({
  selector: 'gt-notification',
  templateUrl: './gt-notification.component.html',
  styleUrls: ['./gt-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgComponentOutlet, ItskIconComponent],
})
export class GtNotificationComponent {
  readonly notificationRef = input.required<GtNotificationRef>();
}
