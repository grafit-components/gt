import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskClickOutsideModule } from '../../directive/itsk-click-outside/itsk-click-outside.module';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskPagerComponent } from './itsk-pager/itsk-pager.component';

@NgModule({
  declarations: [ItskPagerComponent],
  exports: [ItskPagerComponent],
  imports: [CommonModule, ItskClickOutsideModule, ItskIconModule],
})
export class ItskPagerModule {}
