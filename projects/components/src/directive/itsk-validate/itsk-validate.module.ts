import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskValidateGroupDirective } from './itsk-validate-group.directive';
import { ItskValidateDirective } from './itsk-validate.directive';

@NgModule({
  declarations: [ItskValidateDirective, ItskValidateGroupDirective],
  exports: [ItskValidateDirective, ItskValidateGroupDirective],
  imports: [CommonModule],
})
export class ItskValidateModule {}
