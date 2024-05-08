import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ItskIconModule } from '../itsk-icon.module';
import { IconSampleComponent } from './icon-sample/icon-sample.component';

@NgModule({
  declarations: [IconSampleComponent],
  exports: [IconSampleComponent],
  imports: [CommonModule, HttpClientModule, ItskIconModule],
})
export class IconSampleModule {}
