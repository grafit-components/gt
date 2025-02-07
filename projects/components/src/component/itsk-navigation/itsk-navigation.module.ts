import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskMenuModule } from '../itsk-menu/itsk-menu.module';
import { ItskNavigationComponent } from './itsk-navigation/itsk-navigation.component';

@NgModule({
    imports: [CommonModule, ItskIconModule, ItskMenuModule, ItskNavigationComponent],
    exports: [ItskNavigationComponent],
})
export class ItskNavigationModule {}
