import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskListComponent} from './itsk-list/itsk-list.component';
import {ItskListItemComponent} from './itsk-list-item/itsk-list-item.component';
import {ItskDelimiterComponent} from './itsk-delimiter/itsk-delimiter.component';
import {ItskListGroupComponent} from './itsk-list-group/itsk-list-group.component';

@NgModule({
  declarations: [
    ItskListComponent,
    ItskListItemComponent,
    ItskDelimiterComponent,
    ItskListGroupComponent],
  exports: [
    ItskListComponent,
    ItskListItemComponent,
    ItskDelimiterComponent,
    ItskListGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ItskListModule {
}
