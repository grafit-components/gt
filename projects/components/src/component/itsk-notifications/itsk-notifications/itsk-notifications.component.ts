import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ItskAlign } from '../../../common/model/itsk-align.enum';
import { ItskVerticalAlign } from '../../../common/model/itsk-vertical-align.enum';
import { ItskTemplateDirective } from '../../itsk-shared/itsk-template.directive';
import { ItskNotificationService } from '../itsk-notification.service';
import { ItskNotification } from '../model/itsk-notification';

@Component({
    selector: 'itsk-notifications',
    templateUrl: './itsk-notifications.component.html',
    styleUrls: ['./itsk-notifications.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ItskNotificationsComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() align: ItskAlign = ItskAlign.Right;
  @Input() verticalAlign: ItskVerticalAlign = ItskVerticalAlign.Bottom;

  @Output() itemClose: EventEmitter<any> = new EventEmitter();
  @ContentChildren(ItskTemplateDirective) templates?: QueryList<any>;

  ItskAlign = ItskAlign;
  ItskVerticalAlign = ItskVerticalAlign;

  notifications: ItskNotification[] = [];

  template?: TemplateRef<any>;

  private stop$: Subject<boolean> = new Subject<boolean>();

  constructor(private svc$: ItskNotificationService) {}

  ngOnInit() {
    this.svc$.notifications.pipe(takeUntil(this.stop$)).subscribe((notifications) => {
      if (notifications) {
        if (!this.notifications) {
          this.notifications = [];
        }
        this.notifications.push(notifications);
      }
    });

    this.svc$.clear.pipe(takeUntil(this.stop$)).subscribe((x: string) => {
      if (!x) {
        this.notifications = [];
      } else {
        this.clearByName(x);
      }
    });
  }

  clearByName(name: string) {
    if (this.notifications && this.notifications.length > 0) {
      this.notifications = this.notifications.filter((x) => {
        return x.name !== name;
      });
    }
  }

  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      this.template = item.template;
    });
  }

  closedItem(event: any) {
    this.notifications.splice(event.index, 1);
    this.itemClose.emit({
      message: event.message,
    });
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }
}
