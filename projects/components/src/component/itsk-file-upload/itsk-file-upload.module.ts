import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskFileUploadAreaComponent } from './itsk-file-upload-area/itsk-file-upload-area.component';
import { ItskFileUploadButtonComponent } from './itsk-file-upload-button/itsk-file-upload-button.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  exports: [ItskFileUploadButtonComponent, ItskFileUploadAreaComponent],
  imports: [CommonModule, ItskFileUploadButtonComponent, ItskFileUploadAreaComponent],
})
export class ItskFileUploadModule {}
