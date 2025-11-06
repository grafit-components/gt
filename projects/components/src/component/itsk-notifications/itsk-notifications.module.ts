import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskSharedModule } from '../itsk-shared/itsk-shared.module';
import { ItskNotificationItemComponent } from './itsk-notifications/itsk-notification-item/itsk-notification-item.component';
import { ItskNotificationsComponent } from './itsk-notifications/itsk-notifications.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  imports: [CommonModule, ItskSharedModule, ItskIconModule, ItskNotificationsComponent, ItskNotificationItemComponent],
  exports: [ItskNotificationsComponent, ItskSharedModule],
})
export class ItskNotificationsModule {}
