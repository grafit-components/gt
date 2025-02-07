import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskClickOutsideModule } from '../itsk-click-outside/itsk-click-outside.module';
import { ItskTooltipContainerComponent } from './itsk-tooltip-container/itsk-tooltip-container.component';
import { ItskTooltipDirective } from './itsk-tooltip.directive';

@NgModule({
    imports: [CommonModule, ItskClickOutsideModule, ItskTooltipDirective, ItskTooltipContainerComponent],
    exports: [ItskTooltipDirective],
})
export class ItskTooltipModule {}
