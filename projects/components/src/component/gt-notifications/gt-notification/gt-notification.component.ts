import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Injector, input } from '@angular/core';
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
  private readonly injector = inject(Injector);

  readonly notificationRef = input.required<GtNotificationRef>();

  protected componentInjector = computed(() => {
    const notificationRef = this.notificationRef();
    return Injector.create({
      providers: [
        {
          provide: GtNotificationRef,
          useValue: notificationRef,
        },
      ],
      parent: this.injector,
    });
  });
}
