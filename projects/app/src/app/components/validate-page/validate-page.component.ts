import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ValidateBasicComponent } from '../../samples/validate/validate-basic.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-validate-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Директивы и утилиты" title="itskValidate">
      <p lead>
        Директива для отображения состояния проверки поля: ошибка, предупреждение или «всё хорошо». Сама ничего не проверяет — признаки
        ошибки и предупреждения вычисляет приложение, директива отвечает только за оформление и текст сообщения.
      </p>

      <app-doc-section title="Использование">
        <p class="margin-b-3">
          Директива ставится на элемент с <code>ngModel</code> или <code>formControl</code> — без контрола формы она не создастся. При
          инициализации поле оборачивается в блок <code>input-wrapper</code>, в который выводится сообщение. Ошибка важнее предупреждения:
          если заданы оба признака, показывается ошибка.
        </p>
        <p class="margin-b-3"><strong>Важно:</strong> у директивы сейчас две особенности, обе учтены в примере.</p>
        <p class="margin-b-3">
          Параметр <code>disabled</code> по умолчанию равен <code>false</code>, и директива выставляет полю атрибут
          <code>disabled="false"</code> — браузер считает такое поле заблокированным. Пока это не исправлено, передавайте
          <code>[disabled]="$any(undefined)"</code>.
        </p>
        <p class="margin-b-3">
          Если поле с самого начала содержит ошибку, а текст сообщения задан раньше признака <code>error</code>, директива падает: сообщение
          выводится до создания обёртки. Привязывайте <code>errorMessage</code> и <code>warningMessage</code> в шаблоне после
          <code>error</code> и <code>warn</code>.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Группа проверок">
        <p class="margin-b-3">
          Директива <code>itskValidateGroup</code> на родительском элементе собирает состояние всех вложенных <code>itskValidate</code>:
          событие <code>itskValidateGroup</code> сообщает, есть ли ошибки, события <code>errors</code> и <code>warnings</code> отдают тексты
          сообщений.
        </p>
        <p class="margin-b-0">
          <strong>Важно:</strong> группа испускает события после каждой проверки изменений, даже если ничего не поменялось. Обработчик,
          который меняет состояние компонента, запускает новую проверку — и события начинают идти непрерывно. Примера здесь нет по этой
          причине; в обработчиках сравнивайте новое значение с предыдущим.
        </p>
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="itskValidate" [rows]="inputs" />
        <app-api-table title="CSS-классы" nameLabel="Класс" [rows]="classes" />
        <app-api-table title="itskValidateGroup" nameLabel="Событие" [rows]="groupOutputs" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidatePageComponent {
  basicSample = sample('Ошибка, предупреждение и корректное значение', ValidateBasicComponent, 'validate/validate-basic');

  inputs: ApiRow[] = [
    { name: 'error', type: 'boolean', default: 'false', description: 'В поле ошибка' },
    { name: 'errorMessage', type: 'string', description: 'Текст ошибки; без него сообщение не выводится' },
    { name: 'warn', type: 'boolean', default: 'false', description: 'В поле предупреждение' },
    { name: 'warningMessage', type: 'string', description: 'Текст предупреждения' },
    { name: 'markGood', type: 'boolean', default: 'false', description: 'Помечать поле без ошибок и предупреждений как корректное' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Пометить обёртку как обязательное поле (читается один раз)' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Выставить полю атрибут disabled' },
  ];

  classes: ApiRow[] = [
    { name: 'itsk-validate-error', description: 'На поле при ошибке' },
    { name: 'itsk-validate-warn', description: 'На поле при предупреждении' },
    { name: 'itsk-validate-good', description: 'На поле без замечаний при markGood' },
    { name: 'input-wrapper_required', description: 'На обёртке обязательного поля' },
  ];

  groupOutputs: ApiRow[] = [
    { name: 'itskValidateGroup', type: 'boolean', description: 'Есть ли в группе поля с ошибкой' },
    { name: 'errors', type: 'string[]', description: 'Тексты ошибок вложенных полей' },
    { name: 'warnings', type: 'string[]', description: 'Тексты предупреждений вложенных полей' },
  ];
}
