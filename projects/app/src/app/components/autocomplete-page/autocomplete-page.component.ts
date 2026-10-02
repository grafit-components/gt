import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AutocompleteBasicComponent } from '../../samples/autocomplete/autocomplete-basic.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-autocomplete-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Формы" title="ItskAutocompleteComponent">
      <p lead>
        Текстовое поле с выпадающими подсказками. В отличие от селекта, значение не ограничено списком: в модель попадает любая введённая
        строка, а подсказки лишь помогают её выбрать. Реализует <code>ControlValueAccessor</code>.
      </p>

      <app-doc-section title="Базовое использование">
        <p class="margin-b-3">
          Передайте массив строк в <code>values</code> и привяжите модель. При вводе список фильтруется по всем словам запроса без учёта
          регистра и порядка слов. Список открывается при вводе и по стрелкам.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Клавиатура">
        <app-api-table title="Клавиши" nameLabel="Клавиша" [rows]="keys" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Входные параметры" [rows]="inputs" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompletePageComponent {
  basicSample = sample('Базовое использование', AutocompleteBasicComponent, 'autocomplete/autocomplete-basic');

  keys: ApiRow[] = [
    { name: '↑ / ↓', description: 'Открыть список и перемещать фокус по подсказкам' },
    { name: 'Enter', description: 'Подставить подсказку в фокусе и закрыть список; если список закрыт — открыть' },
    { name: 'Esc / Tab', description: 'Закрыть список' },
  ];

  inputs: ApiRow[] = [
    { name: 'values', type: 'string[]', description: 'Строки для подсказок' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать поле' },
    { name: 'itemScrollCount', type: 'number', default: '8', description: 'Сколько подсказок видно без прокрутки' },
    { name: 'fixed', type: 'boolean', default: 'false', description: 'Позиционировать список через position: fixed' },
    { name: 'panelOpen', type: 'boolean', default: 'false', description: 'Состояние открытия списка' },
  ];
}
