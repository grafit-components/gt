import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbBasicComponent } from '../../samples/breadcrumb/breadcrumb-basic.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-breadcrumb-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Навигация" title="ItskBreadcrumbComponent">
      <p lead>
        Хлебные крошки, которые строятся по тем же данным, что и меню. Компонент находит в массиве <code>IItskMenuItem</code> пункт,
        соответствующий текущему адресу, и показывает путь до него. Каждый уровень — выпадающий список соседних пунктов.
      </p>

      <app-doc-section title="Использование">
        <p class="margin-b-3">
          Передайте дерево пунктов в <code>menuItems</code>. Пример ниже живой: он показывает текущую страницу, а выбор другого пункта в
          списке выполняет настоящий переход.
        </p>
        <p class="margin-b-3">
          По умолчанию компонент записывает название активного пункта в заголовок вкладки браузера. Это отключается через
          <code>[changingTitle]="false"</code>. Если адресу не соответствует ни один пункт, выводится <code>defaultTitle</code>.
        </p>
        <p class="margin-b-3">
          <strong>Важно:</strong> компонент внедряет <code>Window</code>, и без провайдера приложение упадёт с ошибкой внедрения. Объявите
          его в корне: <code>{{ windowProvider }}</code
          >.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Входные параметры" [rows]="inputs" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbPageComponent {
  basicSample = sample('Хлебные крошки по текущему адресу', BreadcrumbBasicComponent, 'breadcrumb/breadcrumb-basic');

  windowProvider = '{ provide: Window, useValue: window }';

  inputs: ApiRow[] = [
    { name: 'menuItems', type: 'IItskMenuItem[]', description: 'Дерево пунктов меню' },
    { name: 'changingTitle', type: 'boolean', default: 'true', description: 'Менять заголовок вкладки на название активного пункта' },
    { name: 'defaultTitle', type: 'string', default: "''", description: 'Текст, когда адресу не соответствует ни один пункт' },
  ];
}
