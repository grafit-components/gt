import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuBasicComponent } from '../../samples/menu/menu-basic.component';
import { MenuTemplateComponent } from '../../samples/menu/menu-template.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-menu-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Навигация" title="ItskMenuComponent">
      <p lead>
        Вертикальное меню приложения. Строится по массиву <code>IItskMenuItem</code>, подсвечивает активный пункт по текущему маршруту,
        умеет группировать пункты и раскрывать вложенные уровни. Боковое меню этой документации — тот же компонент.
      </p>

      <app-doc-section title="Базовое использование">
        <p class="margin-b-3">
          Передайте пункты в <code>menu</code>. Пункт с <code>url</code> ведёт по внутреннему маршруту, с <code>outerUrl</code> — по внешней
          ссылке. Пункты с одинаковым <code>group</code> выводятся под общим заголовком после пунктов без группы,
          <code>hidden</code> скрывает пункт, <code>iconClassName</code> задаёт имя иконки.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Вложенные пункты и активный маршрут">
        <p class="margin-b-3">
          Пункт с непустым <code>children</code> получает стрелку и раскрывает подменю по клику на неё или при наведении. Активным считается
          пункт, чей <code>url</code> является началом текущего адреса; чтобы требовать точного совпадения, задайте
          <code>match: 'exact'</code>. Для адресов <code>''</code> и <code>'/'</code> точное совпадение включено всегда.
        </p>
        <p class="margin-b-0">
          Вместо перехода или вместе с ним можно выполнить свой код: функция <code>navigate</code> в описании пункта вызывается при клике, а
          компонент дополнительно испускает событие <code>itemClick</code>.
        </p>
      </app-doc-section>

      <app-doc-section title="Свой шаблон пункта">
        <p class="margin-b-3">
          Поместите внутрь меню <code>ng-template</code> с директивой <code>itskMenuItem</code> — он заменит стандартную разметку пункта.
          Пункт доступен в шаблоне как неявная переменная. Переход по <code>url</code> в этом случае остаётся за шаблоном.
        </p>
        <app-sample [options]="templateSample" />
      </app-doc-section>

      <app-doc-section title="Кнопка меню">
        <p class="margin-b-0">
          <code>itsk-menu-button</code> показывает меню по нажатию на кнопку и закрывает его по клику снаружи. Меню передаётся вложенным
          <code>itsk-menu</code>, своя кнопка — элементом с атрибутом <code>menuButton</code>; без неё выводится стандартная иконка.
          Состояние доступно через двустороннюю привязку <code>[(open)]</code>.
        </p>
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="ItskMenuComponent" [rows]="inputs" />
        <app-api-table title="События" nameLabel="Событие" [rows]="outputs" />
        <app-api-table title="IItskMenuItem" nameLabel="Поле" [rows]="itemFields" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
  basicSample = sample('Пункты, иконки и группы', MenuBasicComponent, 'menu/menu-basic');
  templateSample = sample('Свой шаблон пункта', MenuTemplateComponent, 'menu/menu-template');

  inputs: ApiRow[] = [{ name: 'menu', type: 'IItskMenuItem[]', default: '[]', description: 'Пункты меню' }];

  outputs: ApiRow[] = [
    { name: 'itemClick', type: 'IItskMenuItem', description: 'Клик по пункту' },
    { name: 'itemToggle', type: 'IItskMenuItem', description: 'Раскрытие или сворачивание пункта с вложенными' },
  ];

  itemFields: ApiRow[] = [
    { name: 'name', type: 'string', description: 'Название пункта, единственное обязательное поле' },
    { name: 'url', type: 'string', description: 'Внутренний маршрут' },
    { name: 'outerUrl', type: 'string', description: 'Внешняя ссылка' },
    { name: 'target', type: "'_blank' | '_self' | '_parent' | '_top'", description: 'Где открывать внешнюю ссылку' },
    { name: 'match', type: "'exact'", description: 'Подсвечивать пункт только при точном совпадении адреса' },
    { name: 'group', type: 'string', description: 'Заголовок группы, в которую входит пункт' },
    { name: 'iconClassName', type: 'string', description: 'Имя иконки' },
    { name: 'children', type: 'IItskMenuItem[]', description: 'Вложенные пункты' },
    { name: 'hidden', type: 'boolean', description: 'Не показывать пункт' },
    { name: 'navigate', type: '(item) => void', description: 'Обработчик клика по пункту' },
    { name: 'id, parentId, code, sortOrder, open', type: '—', description: 'Служебные поля, компонент меню их не использует' },
  ];
}
