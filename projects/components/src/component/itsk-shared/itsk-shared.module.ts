import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskMarkDirective } from './itsk-mark.directive';
import { ItskTemplateDirective } from './itsk-template.directive';

@NgModule({
    imports: [CommonModule, ItskMarkDirective, ItskTemplateDirective],
    exports: [ItskMarkDirective, ItskTemplateDirective],
})
export class ItskSharedModule {}
