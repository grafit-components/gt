import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, tap } from 'rxjs/operators';
import { IItskMenuItem } from '../../itsk-menu/model/i-itsk-menu-item';
import { AsyncPipe } from '@angular/common';
import { ItskDropdownComponent } from '../../itsk-dropdown/itsk-dropdown/itsk-dropdown.component';
import { ItskDropdownHeadDirective } from '../../itsk-dropdown/itsk-dropdown-head.directive';
import { ItskIconComponent } from '../../itsk-icon/itsk-icon/itsk-icon.component';
import { ItskDropdownContentDirective } from '../../itsk-dropdown/itsk-dropdown-content.directive';

interface BreadcrumbItem {
  active: IItskMenuItem;
  items: IItskMenuItem[];
}

@Component({
    selector: 'itsk-breadcrumb',
    templateUrl: './itsk-breadcrumb.component.html',
    styleUrls: ['./itsk-breadcrumb.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskDropdownComponent, ItskDropdownHeadDirective, ItskIconComponent, ItskDropdownContentDirective, AsyncPipe]
})
export class ItskBreadcrumbComponent {
  @HostBinding('class.breadcrumb') breadcrumb = true;

  private readonly url$ = this.router.events.pipe(
    startWith(new NavigationEnd(0, this.router.url, this.router.url)),
    filter((event: any) => Boolean(event instanceof NavigationEnd || event instanceof ResolveEnd)),
    map((even: NavigationEnd) => even.urlAfterRedirects.split('?')[0]),
    distinctUntilChanged(),
  );

  breadcrumbItems$?: Observable<BreadcrumbItem[]>;

  @Input()
  set menuItems(value: IItskMenuItem[]) {
    this.breadcrumbItems$ = this.makeItems(value);
  }

  /** Изменять `title` страницы на наименование `MenuItem.name` */
  @Input()
  changingTitle = true;

  @Input()
  defaultTitle = '';

  constructor(
    private window: Window,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private title: Title,
  ) {}

  private makeItems(menuItems: IItskMenuItem[]) {
    return this.url$.pipe(
      map((url) => this.buildBreadcrumbItems(url, menuItems)),
      tap((items) => {
        if (!items.length && this.changingTitle) {
          this.title.setTitle(this.defaultTitle);
        }
        setTimeout(() => this.cdr.detectChanges());
      }),
    );
  }

  private buildBreadcrumbItems(url: string, menuItems: IItskMenuItem[]): BreadcrumbItem[] {
    const active = menuItems.find((menuItem) => {
      if (menuItem.match === 'exact') {
        return menuItem.url === url;
      } else {
        return menuItem.url ? url.startsWith(menuItem.url) : false;
      }
    });

    if (!active) {
      return [];
    }

    const brItem: BreadcrumbItem = {
      active,
      items: menuItems,
    };

    return active?.children ? [brItem, ...this.buildBreadcrumbItems(url, active.children)] : [brItem];
  }

  navigate(menuItem: IItskMenuItem) {
    if (this.changingTitle) {
      this.title.setTitle(menuItem.name);
    }

    if (menuItem.navigate) {
      menuItem.navigate(menuItem);
    }

    if (menuItem.url) {
      this.router.navigateByUrl(menuItem.url);
      return;
    }

    if (menuItem.outerUrl) {
      this.window.open(menuItem.url, menuItem.target ?? '_self');
    }
  }
}
