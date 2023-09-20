import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskSpinnerDirective} from './itsk-spinner.directive';
import {ItskSpinnerComponent} from './itsk-spinner/itsk-spinner.component';
import {ItskSpinnerOverlayComponent} from './itsk-spinner-overlay/itsk-spinner-overlay.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ItskSpinnerDirective,
    ItskSpinnerComponent,
    ItskSpinnerOverlayComponent
  ],
  exports: [
    ItskSpinnerDirective,
    ItskSpinnerComponent,
    ItskSpinnerOverlayComponent
  ]
})
export class ItskSpinnerModule {
}
