import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskFocusDirective } from './itsk-focus.directive';

@NgModule({
    imports: [CommonModule, ItskFocusDirective],
    exports: [ItskFocusDirective],
})
export class ItskFocusModule {}
