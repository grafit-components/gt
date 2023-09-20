import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskTooltipDirective} from './itsk-tooltip.directive';
import {ItskTooltipContainerComponent} from './itsk-tooltip-container/itsk-tooltip-container.component';
import {ItskClickOutsideModule} from '../itsk-click-outside/itsk-click-outside.module';

@NgModule({
    imports: [
        CommonModule,
        ItskClickOutsideModule
    ],
    declarations: [
        ItskTooltipDirective,
        ItskTooltipContainerComponent
    ],
    exports: [
        ItskTooltipDirective
    ]
})
export class ItskTooltipModule {
}
