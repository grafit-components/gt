import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-theme-switch',
    templateUrl: './theme-switch.component.html',
    styleUrls: ['./theme-switch.component.styl'],
    standalone: false
})
export class ThemeSwitchComponent {
  private themeLink: any = document.querySelector('link#client-theme');
  currentTheme: 'default' | 'grafit' | 'green' = 'grafit';
  title: 'Включить темную тему' | 'Включить зеленую тему' | 'Включить синию тему' = 'Включить темную тему';

  @HostListener('window:storage', ['$event'])
  StorageUpdater(event: any) {
    if (event.key === 'theme') {
      this.setTheme(event.newValue);
    }
  }

  constructor() {
    const theme = window.localStorage.theme || 'def';
    this.setTheme(theme);
  }

  onThemeToggle() {
    switch (this.currentTheme) {
      case 'default':
        this.setTheme('default');
        break;
      case 'grafit':
        this.setTheme('grafit');
        break;
      case 'green':
        this.setTheme('green');
        break;
    }
    window.localStorage.theme = this.currentTheme;
  }

  setTheme(themeName: 'default' | 'grafit' | 'green') {
    if (this.currentTheme === themeName) {
      return;
    }
    switch (themeName) {
      case 'default':
        this.themeLink.href = 'theme-default.css';
        this.currentTheme = 'default';
        this.title = 'Включить темную тему';
        break;
      case 'grafit':
        this.themeLink.href = 'theme-grafit.css';
        this.currentTheme = 'grafit';
        this.title = 'Включить синию тему';
        break;
      case 'green':
        this.themeLink.href = 'theme-green.css';
        this.currentTheme = 'green';
        this.title = 'Включить синию тему';
        break;
    }
  }
}
