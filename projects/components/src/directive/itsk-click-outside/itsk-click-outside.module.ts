import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskClickOutsideDirective } from './itsk-click-outside.directive';

@NgModule({
    imports: [CommonModule, ItskClickOutsideDirective],
    exports: [ItskClickOutsideDirective],
})
export class ItskClickOutsideModule {}
