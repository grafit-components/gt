import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskFileUploadButtonComponent} from './itsk-file-upload-button/itsk-file-upload-button.component';
import {ItskFileUploadAreaComponent} from './itsk-file-upload-area/itsk-file-upload-area.component';

@NgModule({
  declarations: [
    ItskFileUploadButtonComponent,
    ItskFileUploadAreaComponent
  ],
  exports: [
    ItskFileUploadButtonComponent,
    ItskFileUploadAreaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ItskFileUploadModule {
}
