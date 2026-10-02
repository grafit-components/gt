import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToggleAppearanceComponent } from '../../samples/toggle/toggle-appearance.component';
import { ToggleBasicComponent } from '../../samples/toggle/toggle-basic.component';
import { ToggleDisabledComponent } from '../../samples/toggle/toggle-disabled.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-toggle-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Формы" title="ItskToggleComponent">
      <p lead>
        Переключатель для булева значения «включено / выключено». Реализует <code>ControlValueAccessor</code>, поэтому работает с
        <code>ngModel</code> и реактивными формами. Подпись передаётся через содержимое тега, её положение и цвета переключателя
        настраиваются.
      </p>

      <app-doc-section title="Базовое использование">
        <p class="margin-b-3">
          Привяжите значение через <code>ngModel</code>, а текст подписи поместите внутрь тега <code>itsk-toggle</code>. Значение меняется
          по клику на любую часть компонента — и на сам переключатель, и на подпись.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Положение подписи и цвета">
        <p class="margin-b-3">
          По умолчанию подпись расположена справа от переключателя, параметр <code>leftLabel</code> переносит её влево. Параметры
          <code>trueColor</code> и <code>falseColor</code> задают цвет фона во включённом и выключенном состоянии — подойдёт любое значение
          CSS-свойства <code>background</code>. Если цвет не задан, используется цвет темы.
        </p>
        <app-sample [options]="appearanceSample" />
      </app-doc-section>

      <app-doc-section title="Блокировка и реактивные формы">
        <p class="margin-b-3">
          Параметр <code>disabled</code> блокирует переключатель: клик перестаёт менять значение, а на компонент навешивается класс
          <code>toggle_disabled</code>. В реактивных формах блокировка управляется состоянием контрола (<code>FormControl.disable()</code>).
        </p>
        <app-sample [options]="disabledSample" />
      </app-doc-section>

      <app-doc-section title="Значение модели и клавиатура">
        <p class="margin-b-3">
          В модель всегда записывается <code>boolean</code>. Если в модели лежит не булево значение (<code>null</code>,
          <code>undefined</code>, строка), переключатель отображает его по правилам truthy/falsy, а первый клик приводит модель к
          <code>true</code>.
        </p>
        <p class="margin-b-0">
          <strong>Важно:</strong> компонент получает фокус по <code>Tab</code>, но переключение с клавиатуры (<code>Space</code> /
          <code>Enter</code>) не реализовано — значение меняется только по клику.
        </p>
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Входные параметры" [rows]="inputs" />
        <app-api-table title="Содержимое" nameLabel="Слот" [rows]="slots" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TogglePageComponent {
  basicSample = sample('Базовое использование', ToggleBasicComponent, 'toggle/toggle-basic');
  appearanceSample = sample('Положение подписи и цвета', ToggleAppearanceComponent, 'toggle/toggle-appearance');
  disabledSample = sample('Блокировка и реактивные формы', ToggleDisabledComponent, 'toggle/toggle-disabled');

  inputs: ApiRow[] = [
    { name: 'leftLabel', type: 'boolean', default: 'false', description: 'Расположить подпись слева от переключателя' },
    { name: 'trueColor', type: 'string', description: 'Цвет фона во включённом состоянии' },
    { name: 'falseColor', type: 'string', description: 'Цвет фона в выключенном состоянии' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать переключатель' },
    { name: 'className', type: 'string[]', description: 'Объявлен, но в шаблоне компонента сейчас не используется' },
  ];

  slots: ApiRow[] = [{ name: '<ng-content>', description: 'Подпись переключателя — текст или произвольная разметка' }];
}
