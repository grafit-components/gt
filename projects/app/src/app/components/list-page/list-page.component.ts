import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListBasicComponent } from '../../samples/list/list-basic.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-list-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Данные и раскладка" title="ItskListComponent">
      <p lead>
        Набор компонентов-обёрток для вертикальных списков: сам список, его пункт, заголовок группы и разделитель. У них нет параметров и
        событий — они только навешивают стилевые классы, а поведение задаёт приложение.
      </p>

      <app-doc-section title="Использование">
        <p class="margin-b-3">
          Соберите список из <code>itsk-list-item</code>, при необходимости разделяя их <code>itsk-delimiter</code> и подписывая разделы
          через <code>itsk-list-group</code>. Клики обрабатываются обычным <code>(click)</code>. Те же классы <code>list</code> и
          <code>list__item</code> можно навесить на обычные элементы — так сделано внутри выпадающих списков библиотеки.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Компоненты" nameLabel="Компонент" [rows]="components" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent {
  basicSample = sample('Список с группой и разделителем', ListBasicComponent, 'list/list-basic');

  components: ApiRow[] = [
    { name: 'itsk-list', description: 'Контейнер списка, класс list' },
    { name: 'itsk-list-item', description: 'Пункт списка, класс list__item' },
    { name: 'itsk-list-group', description: 'Заголовок группы пунктов, класс list__group' },
    { name: 'itsk-delimiter', description: 'Разделитель, класс list__delimiter' },
  ];
}
