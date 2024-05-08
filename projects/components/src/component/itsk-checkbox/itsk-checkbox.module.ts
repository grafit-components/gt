import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskCheckboxComponent } from './itsk-checkbox/itsk-checkbox.component';

@NgModule({
  declarations: [ItskCheckboxComponent],
  exports: [ItskCheckboxComponent],
  imports: [CommonModule, ItskIconModule],
})
export class ItskCheckboxModule {}
