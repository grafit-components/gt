import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskFileUploadAreaComponent, ItskFileUploadButtonComponent } from '@grafit/components';

@Component({
  selector: 'app-file-upload',
  imports: [ItskFileUploadAreaComponent, ItskFileUploadButtonComponent],
  template: `
    <itsk-file-upload-area (upload)="onUpload($event)">Перетащите файлы сюда или нажмите для выбора</itsk-file-upload-area>
    <br />
    <itsk-file-upload-button [multiple]="false" (upload)="onUpload($event)">
      <span class="button_default">Выбрать один файл</span>
    </itsk-file-upload-button>
    <br />
    Files: {{ fileNames.join(', ') || '—' }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  protected fileNames: string[] = [];

  /** Компонент только отдаёт выбранные файлы — отправка на сервер остаётся за приложением */
  protected onUpload(files: FileList) {
    this.fileNames = Array.from(files).map((file) => file.name);
  }
}
