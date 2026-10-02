import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IItskMenuItem, ItskBreadcrumbComponent } from '@grafit/components';

@Component({
  selector: 'app-breadcrumb-basic',
  imports: [ItskBreadcrumbComponent],
  // компонент внедряет `Window` — в приложении этот провайдер обычно объявляют один раз, в корне
  providers: [{ provide: Window, useValue: window }],
  template: `<itsk-breadcrumb [menuItems]="menu" [changingTitle]="false" defaultTitle="Раздел не найден" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbBasicComponent {
  /** Те же данные, что и для `itsk-menu`. Активный пункт определяется по текущему адресу страницы */
  protected menu: IItskMenuItem[] = [
    { name: 'Хлебные крошки', url: '/breadcrumb' },
    { name: 'Вкладки', url: '/tabs' },
    { name: 'Меню', url: '/menu' },
  ];
}
