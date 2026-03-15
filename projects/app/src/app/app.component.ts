import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IItskMenuItem, ItskIconComponent, ItskIconService, ItskMenuComponent } from '@grafit/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterLink, ItskMenuComponent, RouterOutlet, ItskIconComponent],
  standalone: true,
})
export class AppComponent {
  private itskIconService = inject(ItskIconService);

  private themeLink = document.querySelector('link#client-theme') as HTMLLinkElement;

  title = 'app';
  menu: IItskMenuItem[] = [
    {
      id: 0,
      parentId: null,
      name: 'Главная',
      url: '/',
      code: 'Home',
      sortOrder: 0,
    },
    {
      name: 'Селект',
      url: '/select',
    },
    {
      name: 'Уведомления',
      url: '/notifications',
    },
    {
      name: 'Иконки',
      url: '/icons',
    },
    // {
    //   name: 'Code view',
    //   url: '/first',
    // },
  ];

  protected currentTheme: theme = 'light';
  protected toggleThemeTitle: 'Включить темную тему' | 'Включить светлую тему' = 'Включить темную тему';

  constructor() {
    this.itskIconService.addSprite('assets/icon.svg');
    this.setTheme(this.storageTheme);
  }

  protected onThemeToggle() {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }

  private setTheme(themeName: theme) {
    switch (themeName) {
      case 'light':
        this.themeLink.href = 'styles-light.css';
        this.currentTheme = 'light';
        this.title = 'Включить темную тему';
        break;
      case 'dark':
        this.themeLink.href = 'styles-dark.css';
        this.currentTheme = 'dark';
        this.title = 'Включить светлую тему';
        break;
    }
    this.storageTheme = this.currentTheme;

    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  private get storageTheme(): theme {
    return localStorage['theme'] || 'light';
  }
  private set storageTheme(value: theme) {
    localStorage['theme'] = value;
  }
}

type theme = 'light' | 'dark';
