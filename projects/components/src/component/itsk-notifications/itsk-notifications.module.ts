import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskNotificationsComponent} from './itsk-notifications/itsk-notifications.component';
import {ItskNotificationItemComponent} from './itsk-notifications/itsk-notification-item/itsk-notification-item.component';
import {ItskSharedModule} from '../itsk-shared/itsk-shared.module';
import {ItskIconModule} from '../itsk-icon/itsk-icon.module';


@NgModule({
  imports: [
    CommonModule,
    ItskSharedModule,
    ItskIconModule
  ],
  declarations: [
    ItskNotificationsComponent,
    ItskNotificationItemComponent
  ],
  exports: [
    ItskNotificationsComponent,
    ItskSharedModule
  ]
})
export class ItskNotificationsModule {
}
