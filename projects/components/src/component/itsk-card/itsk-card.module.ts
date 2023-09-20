import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskCardComponent} from './itsk-card/itsk-card.component';
import { ItskCardHeaderComponent } from './itsk-card-header/itsk-card-header.component';
import { ItskCardContentComponent } from './itsk-card-content/itsk-card-content.component';

@NgModule({
  declarations: [ItskCardComponent, ItskCardHeaderComponent, ItskCardContentComponent],
  exports: [ItskCardComponent, ItskCardHeaderComponent, ItskCardContentComponent],
  imports: [
    CommonModule
  ]
})
export class ItskCardModule {
}
