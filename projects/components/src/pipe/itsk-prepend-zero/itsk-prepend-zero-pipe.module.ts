import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskPrependZeroPipe } from './itsk-prepend-zero.pipe';

@NgModule({
    imports: [CommonModule, ItskPrependZeroPipe],
    exports: [ItskPrependZeroPipe],
})
export class ItskPrependZeroPipeModule {}
