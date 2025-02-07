import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskValidateGroupDirective } from './itsk-validate-group.directive';
import { ItskValidateDirective } from './itsk-validate.directive';

@NgModule({
    exports: [ItskValidateDirective, ItskValidateGroupDirective],
    imports: [CommonModule, ItskValidateDirective, ItskValidateGroupDirective],
})
export class ItskValidateModule {}
