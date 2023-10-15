import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskHintDirective} from './itsk-hint.directive';
import {ItskHintContainerComponent} from './itsk-hint-container/itsk-hint-container.component';

@NgModule({
    declarations: [
        ItskHintDirective,
        ItskHintContainerComponent
    ],
    exports: [
        ItskHintDirective
    ],
    imports: [
        CommonModule
    ]
})
export class ItskHintModule {
}
