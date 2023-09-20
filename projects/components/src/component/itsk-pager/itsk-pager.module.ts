import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskPagerComponent} from './itsk-pager/itsk-pager.component';
import {ItskClickOutsideModule} from '../../directive/itsk-click-outside/itsk-click-outside.module';
import {ItskIconModule} from '../itsk-icon/itsk-icon.module';

@NgModule({
  declarations: [
    ItskPagerComponent
  ],
  exports: [
    ItskPagerComponent
  ],
  imports: [
    CommonModule,
    ItskClickOutsideModule,
    ItskIconModule
  ]
})
export class ItskPagerModule {
}
