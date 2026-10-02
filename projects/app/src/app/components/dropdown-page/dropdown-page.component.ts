import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DropdownBasicComponent } from '../../samples/dropdown/dropdown-basic.component';
import { DropdownGuardComponent } from '../../samples/dropdown/dropdown-guard.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-dropdown-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Данные и раскладка" title="ItskDropdownComponent">
      <p lead>
        Базовый выпадающий блок: заголовок, по клику на который под ним показывается произвольное содержимое. На нём построены селект,
        автодополнение, выбор даты и хлебные крошки.
      </p>

      <app-doc-section title="Базовое использование">
        <p class="margin-b-3">
          Заголовок задаётся шаблоном с директивой <code>itskDropdownHead</code>, содержимое — шаблоном с <code>itskDropdownContent</code>.
          Клик по заголовку переключает блок, клик снаружи закрывает его. Состояние доступно через двустороннюю привязку
          <code>[(open)]</code>.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Условия открытия и закрытия">
        <p class="margin-b-3">
          <code>canOpen</code> и <code>canClose</code> принимают <code>boolean</code> или функцию, возвращающую <code>boolean</code> либо
          <code>Promise</code> — так можно, например, спросить подтверждение перед закрытием. <code>[autoClose]="false"</code> отключает
          закрытие по клику снаружи.
        </p>
        <app-sample [options]="guardSample" />
      </app-doc-section>

      <app-doc-section title="Позиционирование">
        <p class="margin-b-0">
          По умолчанию содержимое позиционируется абсолютно относительно компонента и может обрезаться родителем с
          <code>overflow: hidden</code>. С <code>[fixed]="true"</code> оно выводится через <code>position: fixed</code>, получает ширину не
          меньше заголовка и открывается вверх или влево, если компонент находится в нижней или правой части окна. При прокрутке родителя
          такой блок закрывается. <code>align</code> выравнивает содержимое по левому или правому краю.
        </p>
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Входные параметры" [rows]="inputs" />
        <app-api-table title="События" nameLabel="Событие" [rows]="outputs" />
        <app-api-table title="Методы" nameLabel="Метод" [rows]="methods" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownPageComponent {
  basicSample = sample('Меню действий', DropdownBasicComponent, 'dropdown/dropdown-basic');
  guardSample = sample('Условие открытия и ручное закрытие', DropdownGuardComponent, 'dropdown/dropdown-guard');

  inputs: ApiRow[] = [
    { name: 'open', type: 'boolean', default: 'false', description: 'Состояние блока' },
    { name: 'canOpen', type: 'boolean | (() => boolean | Promise<boolean>)', default: 'true', description: 'Разрешено ли открытие' },
    { name: 'canClose', type: 'boolean | (() => boolean | Promise<boolean>)', default: 'true', description: 'Разрешено ли закрытие' },
    { name: 'autoClose', type: 'boolean', default: 'true', description: 'Закрывать по клику снаружи и при прокрутке родителя' },
    { name: 'fixed', type: 'boolean', default: 'false', description: 'Позиционировать содержимое через position: fixed' },
    { name: 'align', type: 'ItskAlign.Left | ItskAlign.Right', default: 'ItskAlign.Left', description: 'Выравнивание содержимого' },
  ];

  outputs: ApiRow[] = [{ name: 'openChange', type: 'boolean', description: 'Блок открылся или закрылся по действию пользователя' }];

  methods: ApiRow[] = [{ name: 'toggle(visible)', description: 'Открыть или закрыть блок с учётом canOpen и canClose' }];
}
