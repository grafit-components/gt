import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskNavigationComponent, NavigationData } from '@grafit/components';

@Component({
  selector: 'app-navigation-basic',
  imports: [ItskNavigationComponent],
  template: `
    <button class="button_default" (click)="nav.openNavigation()">Открыть навигацию</button>

    <itsk-navigation #nav [navigationData]="data">
      <ng-template #navHeaderCustom>
        <div class="margin-t-2">Произвольное содержимое шапки</div>
      </ng-template>
    </itsk-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBasicComponent {
  protected data: NavigationData = {
    title: 'Grafit',
    subtitle: 'Библиотека компонентов',
    menuItems: [
      { name: 'Главная', url: '/', match: 'exact' },
      { name: 'Вкладки', url: '/tabs' },
      { name: 'Меню', url: '/menu' },
    ],
    // ссылка на символ в svg-спрайте, например 'assets/logo.svg#logo'
    footerImg: '',
    footerText: '© Grafit',
    version: 'v1.0.0',
  };
}
