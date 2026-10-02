import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RadioBasicComponent } from '../../samples/radio/radio-basic.component';
import { RadioInlineComponent } from '../../samples/radio/radio-inline.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-radio-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Формы" title="ItskRadioComponent">
      <p lead>
        Группа радиокнопок для выбора одного значения из нескольких. Группа <code>itsk-radio</code> реализует
        <code>ControlValueAccessor</code>, варианты задаются вложенными <code>itsk-radio-button</code>.
      </p>

      <app-doc-section title="Базовое использование">
        <p class="margin-b-3">
          Привяжите модель к <code>itsk-radio</code>, а каждому <code>itsk-radio-button</code> задайте <code>value</code>. Если
          <code>value</code> не указан, значением кнопки становится её текст. Кнопки должны быть прямыми потомками группы.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Расположение в строку и блокировка">
        <p class="margin-b-3">
          Параметр <code>inline</code> выстраивает кнопки в строку. <code>disabled</code> на группе блокирует все кнопки сразу, в реактивных
          формах блокировка управляется состоянием контрола.
        </p>
        <app-sample [options]="inlineSample" />
      </app-doc-section>

      <app-doc-section title="Клавиатура">
        <p class="margin-b-3">
          Группа получает фокус по <code>Tab</code> и управляется с клавиатуры. По умолчанию стрелки сразу меняют значение; при
          <code>[checkChangeSelected]="false"</code> стрелки только перемещают подсветку, а значение применяется по <code>Space</code> или
          <code>Enter</code>.
        </p>
        <app-api-table title="Клавиши" nameLabel="Клавиша" [rows]="keys" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="ItskRadioComponent" [rows]="radioInputs" />
        <app-api-table title="ItskRadioButtonComponent" [rows]="buttonInputs" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioPageComponent {
  basicSample = sample('Базовое использование', RadioBasicComponent, 'radio/radio-basic');
  inlineSample = sample('В строку, с блокировкой', RadioInlineComponent, 'radio/radio-inline');

  keys: ApiRow[] = [
    { name: '↑ / ←', description: 'Перейти к предыдущей доступной кнопке' },
    { name: '↓ / →', description: 'Перейти к следующей доступной кнопке' },
    { name: 'Space / Enter', description: 'Выбрать подсвеченную кнопку' },
  ];

  radioInputs: ApiRow[] = [
    { name: 'inline', type: 'boolean', default: 'false', description: 'Расположить кнопки в строку' },
    { name: 'checkChangeSelected', type: 'boolean', default: 'true', description: 'Менять значение сразу при перемещении стрелками' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать всю группу' },
    { name: 'value', type: 'any', description: 'Текущее значение группы — альтернатива ngModel' },
  ];

  buttonInputs: ApiRow[] = [
    { name: 'value', type: 'any', default: 'текст кнопки', description: 'Значение, которое попадёт в модель при выборе' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать отдельную кнопку' },
    { name: 'checked', type: 'boolean', default: 'false', description: 'Признак выбранной кнопки, обычно выставляется группой' },
  ];
}
