import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationBasicComponent } from '../../samples/navigation/navigation-basic.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-navigation-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Навигация" title="ItskNavigationComponent">
      <p lead>
        Выезжающая панель навигации поверх страницы: шапка с названием системы, меню на основе <code>ItskMenuComponent</code> и подвал с
        логотипом и версией. Всё содержимое описывается одним объектом <code>NavigationData</code>.
      </p>

      <app-doc-section title="Использование">
        <p class="margin-b-3">
          Панель открывается и закрывается методами <code>openNavigation()</code> и <code>closeNavigation()</code> — получите ссылку на
          компонент через шаблонную переменную. Панель закрывается сама при клике по затемнению, по кнопкам в шапке и после любого перехода
          по маршруту.
        </p>
        <p class="margin-b-3">
          В шапку можно добавить своё содержимое: поместите внутрь компонента <code>ng-template</code> с шаблонной переменной
          <code>#navHeaderCustom</code>.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="Входные параметры" [rows]="inputs" />
        <app-api-table title="Методы" nameLabel="Метод" [rows]="methods" />
        <app-api-table title="NavigationData" nameLabel="Поле" [rows]="dataFields" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationPageComponent {
  basicSample = sample('Панель навигации', NavigationBasicComponent, 'navigation/navigation-basic');

  inputs: ApiRow[] = [{ name: 'navigationData', type: 'NavigationData', description: 'Содержимое панели' }];

  methods: ApiRow[] = [
    { name: 'openNavigation()', description: 'Показать панель' },
    { name: 'closeNavigation()', description: 'Скрыть панель' },
  ];

  dataFields: ApiRow[] = [
    { name: 'menuItems', type: 'IItskMenuItem[]', description: 'Пункты меню' },
    { name: 'title', type: 'string', description: 'Заголовок в шапке' },
    { name: 'subtitle', type: 'string', description: 'Подзаголовок в шапке' },
    { name: 'footerImg', type: 'string', description: 'Ссылка на символ svg-спрайта для логотипа в подвале' },
    { name: 'footerImgWidth', type: 'string', description: 'Ширина логотипа; учитывается только вместе с footerImgHeight' },
    { name: 'footerImgHeight', type: 'string', description: 'Высота логотипа' },
    { name: 'footerText', type: 'string', description: 'Текст в подвале' },
    { name: 'version', type: 'string', description: 'Версия приложения в подвале' },
  ];
}
