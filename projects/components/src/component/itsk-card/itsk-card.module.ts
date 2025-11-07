import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskCardContentComponent } from './itsk-card-content/itsk-card-content.component';
import { ItskCardHeaderComponent } from './itsk-card-header/itsk-card-header.component';
import { ItskCardComponent } from './itsk-card/itsk-card.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  exports: [ItskCardComponent, ItskCardHeaderComponent, ItskCardContentComponent],
  imports: [CommonModule, ItskCardComponent, ItskCardHeaderComponent, ItskCardContentComponent],
})
export class ItskCardModule {}
