import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconSampleComponent} from './icon-sample/icon-sample.component';
import {ItskIconModule} from '../itsk-icon.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [IconSampleComponent],
  exports: [IconSampleComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ItskIconModule
  ]
})
export class IconSampleModule {
}
