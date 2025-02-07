import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskTabContentDirective } from './itsk-tab-content/itsk-tab-content.directive';
import { ItskTabTitleDirective } from './itsk-tab-title/itsk-tab-title.directive';
import { ItskTabComponent } from './itsk-tab/itsk-tab.component';
import { ItskTabsComponent } from './itsk-tabs/itsk-tabs.component';

@NgModule({
    imports: [CommonModule, ItskTabTitleDirective, ItskTabContentDirective, ItskTabsComponent, ItskTabComponent],
    exports: [ItskTabTitleDirective, ItskTabContentDirective, ItskTabsComponent, ItskTabComponent],
})
export class ItskTabsModule {}
