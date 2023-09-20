import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskTabsComponent} from './itsk-tabs/itsk-tabs.component';
import {ItskTabTitleDirective} from './itsk-tab-title/itsk-tab-title.directive';
import {ItskTabContentDirective} from './itsk-tab-content/itsk-tab-content.directive';
import {ItskTabComponent} from './itsk-tab/itsk-tab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ItskTabTitleDirective,
    ItskTabContentDirective,
    ItskTabsComponent,
    ItskTabComponent],
  exports: [
    ItskTabTitleDirective,
    ItskTabContentDirective,
    ItskTabsComponent,
    ItskTabComponent]
})
export class ItskTabsModule {
}
