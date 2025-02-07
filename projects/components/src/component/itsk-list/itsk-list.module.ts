import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskDelimiterComponent } from './itsk-delimiter/itsk-delimiter.component';
import { ItskListGroupComponent } from './itsk-list-group/itsk-list-group.component';
import { ItskListItemComponent } from './itsk-list-item/itsk-list-item.component';
import { ItskListComponent } from './itsk-list/itsk-list.component';

@NgModule({
    exports: [ItskListComponent, ItskListItemComponent, ItskDelimiterComponent, ItskListGroupComponent],
    imports: [CommonModule, ItskListComponent, ItskListItemComponent, ItskDelimiterComponent, ItskListGroupComponent],
})
export class ItskListModule {}
