import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckboxBinaryComponent } from '../../samples/checkbox/checkbox-binary.component';
import { CheckboxDisabledComponent } from '../../samples/checkbox/checkbox-disabled.component';
import { CheckboxListComponent } from '../../samples/checkbox/checkbox-list.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-checkbox-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Формы" title="ItskCheckboxComponent">
      <p lead>
        Чекбокс с двумя режимами работы: одиночный флаг (<code>binary</code>) и выбор нескольких значений в общий массив. Реализует
        <code>ControlValueAccessor</code>, поэтому работает с <code>ngModel</code> и реактивными формами.
      </p>

      <app-doc-section title="Одиночный флаг">
        <p class="margin-b-3">
          Включите <code>[binary]="true"</code> — в модель будет записываться <code>true</code> или <code>false</code>. Если нужны другие
          значения, задайте их через <code>trueValue</code> и <code>falseValue</code>. Чекбокс считается отмеченным, когда модель строго
          равна <code>trueValue</code>.
        </p>
        <app-sample [options]="binarySample" />
      </app-doc-section>

      <app-doc-section title="Выбор нескольких значений">
        <p class="margin-b-3">
          Без <code>binary</code> модель — это массив. Привяжите несколько чекбоксов к одной модели и задайте каждому своё
          <code>value</code>: отмеченный чекбокс добавляет значение в массив, снятый — убирает. При каждом изменении создаётся новый массив,
          исходный не мутируется.
        </p>
        <p class="margin-b-3">
          <strong>Важно:</strong> это режим по умолчанию. Если забыть <code>binary</code> у одиночного чекбокса, в модель попадёт массив
          вида <code>[undefined]</code> вместо <code>true</code>.
        </p>
        <app-sample [options]="listSample" />
      </app-doc-section>

      <app-doc-section title="Блокировка">
        <p class="margin-b-3">
          Параметр <code>disabled</code> блокирует чекбокс и добавляет класс <code>checkbox_disabled</code>. В реактивных формах блокировка
          управляется состоянием контрола. Как и переключатель, чекбокс получает фокус по <code>Tab</code>, но с клавиатуры не переключается
          — только по клику.
        </p>
        <app-sample [options]="disabledSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Входные параметры" [rows]="inputs" />
        <app-api-table title="Содержимое" nameLabel="Слот" [rows]="slots" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPageComponent {
  binarySample = sample('Одиночный флаг', CheckboxBinaryComponent, 'checkbox/checkbox-binary');
  listSample = sample('Выбор нескольких значений', CheckboxListComponent, 'checkbox/checkbox-list');
  disabledSample = sample('Блокировка', CheckboxDisabledComponent, 'checkbox/checkbox-disabled');

  inputs: ApiRow[] = [
    { name: 'binary', type: 'boolean', default: 'false', description: 'Режим одиночного флага вместо массива значений' },
    { name: 'value', type: 'any', description: 'Значение, которое чекбокс добавляет в массив модели (режим без binary)' },
    { name: 'trueValue', type: 'any', default: 'true', description: 'Значение модели для отмеченного чекбокса (режим binary)' },
    { name: 'falseValue', type: 'any', default: 'false', description: 'Значение модели для снятого чекбокса (режим binary)' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать чекбокс' },
  ];

  slots: ApiRow[] = [{ name: '<ng-content>', description: 'Подпись чекбокса — текст или произвольная разметка' }];
}
