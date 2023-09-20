import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItskNavigationComponent} from './itsk-navigation/itsk-navigation.component';
import {ItskIconModule} from '../itsk-icon/itsk-icon.module';
import {ItskMenuModule} from '../itsk-menu/itsk-menu.module';



@NgModule({
  declarations: [
    ItskNavigationComponent
  ],
  imports: [
    CommonModule,
    ItskIconModule,
    ItskMenuModule,
  ],
  exports: [
    ItskNavigationComponent,
  ]
})
export class ItskNavigationModule { }
