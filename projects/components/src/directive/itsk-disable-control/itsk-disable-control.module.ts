import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskDisableControlDirective } from './itsk-disable-control.directive';

@NgModule({
    exports: [ItskDisableControlDirective],
    imports: [CommonModule, ItskDisableControlDirective],
})
export class ItskDisableControlModule {}
