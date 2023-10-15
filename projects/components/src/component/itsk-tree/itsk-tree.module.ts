import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskTreeComponent} from './itsk-tree/itsk-tree.component';
import {ItskTreeItemComponent} from './itsk-tree-item/itsk-tree-item.component';
import {ItskTreeHostComponent} from './itsk-tree-host/itsk-tree-host.component';
import {ItskTreeToggleDirective} from './itsk-tree-toggle.directive';
import {ItskSharedModule} from '../itsk-shared/itsk-shared.module';
import {ItskTreeTemplateDirective} from './itsk-tree-template.directive';

@NgModule({
    declarations: [
        ItskTreeComponent,
        ItskTreeItemComponent,
        ItskTreeHostComponent,
        ItskTreeToggleDirective,
        ItskTreeTemplateDirective
    ],
    exports: [
        ItskTreeComponent,
        ItskTreeItemComponent,
        ItskTreeToggleDirective,
        ItskSharedModule,
        ItskTreeTemplateDirective
    ],
  imports: [
    CommonModule,
    ItskSharedModule
  ]
})
export class ItskTreeModule {
}
