import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploadComponent } from '../../samples/file-upload/file-upload.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-file-upload-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Формы" title="ItskFileUpload">
      <p lead>
        Два компонента для выбора файлов: <code>itsk-file-upload-area</code> — область, на которую можно перетащить файлы, и
        <code>itsk-file-upload-button</code> — обёртка, превращающая любое содержимое в кнопку выбора файла. Оба только отдают выбранные
        файлы, отправка на сервер остаётся за приложением.
      </p>

      <app-doc-section title="Использование">
        <p class="margin-b-3">
          Подпишитесь на событие <code>upload</code> — в нём приходит <code>FileList</code>. После события поле сбрасывается, поэтому один и
          тот же файл можно выбрать повторно. По умолчанию разрешён выбор нескольких файлов, отключается через
          <code>[multiple]="false"</code>.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <p class="margin-b-3">Параметры у обоих компонентов одинаковые.</p>
        <app-api-table title="Входные параметры" [rows]="inputs" />
        <app-api-table title="События" nameLabel="Событие" [rows]="outputs" />
        <app-api-table title="Содержимое" nameLabel="Слот" [rows]="slots" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadPageComponent {
  basicSample = sample('Область и кнопка', FileUploadComponent, 'file-upload/file-upload');

  inputs: ApiRow[] = [
    { name: 'multiple', type: 'boolean', default: 'true', description: 'Разрешить выбор нескольких файлов' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать выбор файлов' },
  ];

  outputs: ApiRow[] = [{ name: 'upload', type: 'FileList', description: 'Пользователь выбрал или перетащил файлы' }];

  slots: ApiRow[] = [{ name: '<ng-content>', description: 'Содержимое области или кнопки' }];
}
