import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskSharedModule } from '../itsk-shared/itsk-shared.module';
import { ItskTreeHostComponent } from './itsk-tree-host/itsk-tree-host.component';
import { ItskTreeItemComponent } from './itsk-tree-item/itsk-tree-item.component';
import { ItskTreeTemplateDirective } from './itsk-tree-template.directive';
import { ItskTreeToggleDirective } from './itsk-tree-toggle.directive';
import { ItskTreeComponent } from './itsk-tree/itsk-tree.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  exports: [ItskTreeComponent, ItskTreeItemComponent, ItskTreeToggleDirective, ItskSharedModule, ItskTreeTemplateDirective],
  imports: [
    CommonModule,
    ItskSharedModule,
    ItskTreeComponent,
    ItskTreeItemComponent,
    ItskTreeHostComponent,
    ItskTreeToggleDirective,
    ItskTreeTemplateDirective,
  ],
})
export class ItskTreeModule {}
