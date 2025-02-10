import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ItskNotification } from '../../model/itsk-notification';
import { ItskNotificationLevel } from '../../model/itsk-notification-level.enum';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ItskIconComponent } from '../../../itsk-icon/itsk-icon/itsk-icon.component';

@Component({
    selector: 'itsk-notification-item',
    templateUrl: './itsk-notification-item.component.html',
    styleUrls: ['./itsk-notification-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, ItskIconComponent, NgTemplateOutlet]
})
export class ItskNotificationItemComponent implements AfterViewInit, OnDestroy {
  ItskNotificationLevel = ItskNotificationLevel;

  @Input() notification: ItskNotification = new ItskNotification();
  @Input() index?: number;
  @Input() template?: TemplateRef<any>;
  @Output() closed: EventEmitter<any> = new EventEmitter();

  @ViewChild('container', { static: false }) containerViewChild?: ElementRef;

  timeout: any;

  ngAfterViewInit() {
    this.init();
  }

  init() {
    if (!this.notification.infinite) {
      this.timeout = setTimeout(() => {
        this.closed.emit({
          index: this.index,
          message: this.notification,
        });
      }, this.notification.duration);
    }
  }

  reset() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  closeMe(event: MouseEvent) {
    this.reset();

    this.closed.emit({
      index: this.index,
      message: this.notification,
    });

    event.preventDefault();
  }

  ngOnDestroy() {
    this.reset();
  }
}
