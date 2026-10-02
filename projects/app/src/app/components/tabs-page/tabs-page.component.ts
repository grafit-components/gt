import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabsBasicComponent } from '../../samples/tabs/tabs-basic.component';
import { TabsControlComponent } from '../../samples/tabs/tabs-control.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-tabs-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Навигация" title="ItskTabsComponent">
      <p lead>
        Вкладки. Контейнер <code>itsk-tabs</code> содержит несколько <code>itsk-tab</code>, содержимое каждой вкладки задаётся шаблоном с
        директивой <code>itskTabContent</code>. Блок с исходным кодом в примерах этой документации собран на них же.
      </p>

      <app-doc-section title="Базовое использование">
        <p class="margin-b-3">
          Заголовок вкладки — строка в параметре <code>title</code> или шаблон с директивой <code>itskTabTitle</code>, если нужна разметка.
          Вкладку с <code>disabled</code> открыть нельзя. Если активная вкладка не задана, открывается первая.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Управление активной вкладкой">
        <p class="margin-b-3">
          Задайте вкладкам <code>id</code> — тогда начальную вкладку можно выбрать через <code>activeId</code>, а переключить программно
          методом <code>select(id)</code>. Перед каждым переключением срабатывает событие <code>tabChange</code>; вызов
          <code>preventDefault()</code> в обработчике отменяет переход.
        </p>
        <p class="margin-b-3">
          По умолчанию содержимое неактивных вкладок уничтожается. Чтобы сохранять его состояние, задайте
          <code>[destroyOnHide]="false"</code>.
        </p>
        <app-sample [options]="controlSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="ItskTabsComponent" [rows]="tabsInputs" />
        <app-api-table title="События" nameLabel="Событие" [rows]="outputs" />
        <app-api-table title="Методы" nameLabel="Метод" [rows]="methods" />
        <app-api-table title="ItskTabComponent" [rows]="tabInputs" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPageComponent {
  basicSample = sample('Заголовки строкой и шаблоном', TabsBasicComponent, 'tabs/tabs-basic');
  controlSample = sample('Программное управление и отмена перехода', TabsControlComponent, 'tabs/tabs-control');

  tabsInputs: ApiRow[] = [
    { name: 'activeId', type: 'string', default: 'id первой вкладки', description: 'Идентификатор активной вкладки' },
    { name: 'destroyOnHide', type: 'boolean', default: 'true', description: 'Уничтожать содержимое неактивных вкладок' },
  ];

  outputs: ApiRow[] = [
    { name: 'tabChange', type: 'IItskTabChangeEvent', description: 'Перед переключением: activeId, nextId и preventDefault()' },
  ];

  methods: ApiRow[] = [{ name: 'select(tabId)', description: 'Открыть вкладку с указанным идентификатором' }];

  tabInputs: ApiRow[] = [
    { name: 'id', type: 'string', default: 'itsk-tab-N', description: 'Идентификатор вкладки, уникальный в пределах документа' },
    { name: 'title', type: 'string', default: "''", description: 'Текстовый заголовок' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Запретить открытие вкладки' },
  ];
}
