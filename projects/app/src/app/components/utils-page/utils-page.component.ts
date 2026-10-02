import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClickOutsideComponent } from '../../samples/utils/click-outside.component';
import { InputDirectivesComponent } from '../../samples/utils/input-directives.component';
import { MarkComponent } from '../../samples/utils/mark.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-utils-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Директивы и утилиты" title="Вспомогательные директивы">
      <p lead>
        Небольшие директивы и пайп, которые используются внутри компонентов библиотеки и доступны приложению: клик снаружи элемента,
        ограничение ввода, блокировка и фокус поля, подсветка найденного текста, дополнение числа нулями.
      </p>

      <app-doc-section title="itskClickOutside">
        <p class="margin-b-3">
          Событие <code>itskClickOutside</code> срабатывает при клике за пределами элемента. Директива слушает клики, только пока
          <code>visible</code> равно <code>true</code>, — без этого параметра событий не будет. Так удобно включать её вместе с показом
          всплывающего блока. <code>rightClick</code> добавляет отслеживание правой кнопки и должен быть задан раньше <code>visible</code>.
        </p>
        <app-sample [options]="clickOutsideSample" />
      </app-doc-section>

      <app-doc-section title="itskOnlyNumber, itskDisableControl, itskFocus">
        <p class="margin-b-3">
          <code>itskOnlyNumber</code> работает в паре с <code>ngModel</code> и откатывает ввод, который не подходит под шаблон. По умолчанию
          разрешено число с необязательным минусом и дробной частью через точку; свой шаблон передаётся строкой регулярного выражения.
        </p>
        <p class="margin-b-3">
          <code>itskDisableControl</code> блокирует контрол формы по булеву значению — замена атрибуту <code>disabled</code>, который не
          работает с реактивными формами.
        </p>
        <p class="margin-b-3">
          <code>itskFocus</code> ставит фокус на элемент, когда его параметр становится истинным. Обратите внимание на имя параметра: это
          <code>appItskFocus</code>, а не <code>itskFocus</code>.
        </p>
        <app-sample [options]="inputSample" />
      </app-doc-section>

      <app-doc-section title="itskMark и itskPrependZero">
        <p class="margin-b-3">
          <code>itskMark</code> оборачивает в <code>mark</code> все вхождения слов из переданной строки без учёта регистра.
          <code>hideWithoutMark</code> очищает элемент, если совпадений нет. Директива переписывает HTML элемента, поэтому подходит для
          текста, который не меняется после вывода.
        </p>
        <p class="margin-b-3">
          Пайп <code>itskPrependZero</code> дополняет число ведущими нулями до заданной длины. Число длиннее заданной длины будет обрезано
          слева.
        </p>
        <app-sample [options]="markSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="itskClickOutside" [rows]="clickOutside" />
        <app-api-table title="Поля ввода" [rows]="inputDirectives" />
        <app-api-table title="itskMark" [rows]="mark" />
        <app-api-table title="itskPrependZero" [rows]="prependZero" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilsPageComponent {
  clickOutsideSample = sample('Клик снаружи блока', ClickOutsideComponent, 'utils/click-outside');
  inputSample = sample('Директивы для полей ввода', InputDirectivesComponent, 'utils/input-directives');
  markSample = sample('Подсветка совпадений и ведущие нули', MarkComponent, 'utils/mark');

  clickOutside: ApiRow[] = [
    { name: '(itskClickOutside)', type: 'MouseEvent', description: 'Клик за пределами элемента' },
    { name: 'visible', type: 'boolean', default: 'false', description: 'Отслеживать клики' },
    { name: 'rightClick', type: 'boolean', default: 'false', description: 'Отслеживать и правую кнопку мыши' },
  ];

  inputDirectives: ApiRow[] = [
    { name: 'itskOnlyNumber', type: 'string', default: '^-?\\d*\\.?\\d*$', description: 'Регулярное выражение допустимого значения' },
    { name: 'itskDisableControl', type: 'boolean', description: 'Заблокировать контрол формы' },
    { name: 'appItskFocus', type: 'boolean', default: 'false', description: 'Поставить фокус на элемент с директивой itskFocus' },
  ];

  mark: ApiRow[] = [
    { name: 'itskMark', type: 'string', description: 'Слова для подсветки, разделённые пробелами' },
    { name: 'hideWithoutMark', type: 'boolean', default: 'false', description: 'Очищать элемент, если совпадений нет' },
  ];

  prependZero: ApiRow[] = [{ name: 'length', type: 'number', description: 'Длина результата: 7 | itskPrependZero: 3 даёт 007' }];
}
