import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskIconComponent } from './itsk-icon/itsk-icon.component';

@NgModule({
    imports: [CommonModule, ItskIconComponent],
    exports: [ItskIconComponent],
})
export class ItskIconModule {}
