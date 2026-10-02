import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PagerBasicComponent } from '../../samples/pager/pager-basic.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-pager-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Навигация" title="ItskPagerComponent">
      <p lead>
        Пагинатор: кнопки перехода по страницам, выбор размера страницы и счётчики страниц и записей. Состояние описывается объектом
        <code>Paging</code>, компонент сам данные не загружает.
      </p>

      <app-doc-section title="Использование">
        <p class="margin-b-3">
          Передайте состояние в <code>paging</code> и обновляйте его по событию <code>pagingChange</code>. Номер страницы
          <code>page</code> считается с нуля. Количество страниц <code>count</code> нужно передавать самостоятельно — из
          <code>totalCount</code> оно вычисляется только при смене размера страницы.
        </p>
        <p class="margin-b-3">
          Одновременно показывается не больше пяти номеров страниц вокруг текущей. Варианты размера страницы задаются в
          <code>pageSizeList</code>, весь блок выбора скрывается через <code>[pageSizeSelection]="false"</code>.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Подписи">
        <p class="margin-b-0">
          Подписи «Page size», «Pages count» и «Records count» по умолчанию английские. Они меняются глобально: вызовите
          <code>ItskPagerConfigService.setConfig()</code> с объектом <code>ItskPagerConfig</code> при старте приложения.
        </p>
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Входные параметры" [rows]="inputs" />
        <app-api-table title="События" nameLabel="Событие" [rows]="outputs" />
        <app-api-table title="Paging" nameLabel="Поле" [rows]="pagingFields" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerPageComponent {
  basicSample = sample('Пагинатор на 240 записей', PagerBasicComponent, 'pager/pager-basic');

  inputs: ApiRow[] = [
    { name: 'paging', type: 'Paging', description: 'Состояние пагинатора' },
    { name: 'pageSizeSelection', type: 'boolean', default: 'true', description: 'Показывать выбор размера страницы' },
    { name: 'pageSizeList', type: 'number[]', default: '[25, 50, 75, 100]', description: 'Варианты размера страницы' },
  ];

  outputs: ApiRow[] = [{ name: 'pagingChange', type: 'Paging', description: 'Изменилась страница или размер страницы' }];

  pagingFields: ApiRow[] = [
    { name: 'page', type: 'number', default: '0', description: 'Текущая страница, считая с нуля' },
    { name: 'pageSize', type: 'number', default: '30', description: 'Количество записей на странице' },
    { name: 'count', type: 'number', default: '0', description: 'Количество страниц' },
    { name: 'totalCount', type: 'number', default: '0', description: 'Количество записей' },
  ];
}
