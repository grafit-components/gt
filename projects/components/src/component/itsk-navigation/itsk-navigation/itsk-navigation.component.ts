import { Component, ContentChild, HostListener, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationData } from '../model/itsk-navigation-data';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ItskIconComponent } from '../../itsk-icon/itsk-icon/itsk-icon.component';
import { ItskMenuComponent } from '../../itsk-menu/itsk-menu/itsk-menu.component';

@Component({
    selector: 'itsk-navigation',
    templateUrl: './itsk-navigation.component.html',
    imports: [NgIf, ItskIconComponent, NgTemplateOutlet, ItskMenuComponent]
})
export class ItskNavigationComponent implements OnInit {
  @Input()
  navigationData?: NavigationData;

  @ContentChild('navHeaderCustom', { static: true }) headerTemplate: any;
  navigationVisible = false;

  @HostListener('click', ['$event']) clickHandler(e: any) {
    if (e.target.classList.contains('navigation')) {
      this.closeNavigation();
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeNavigation();
      }
    });
  }

  openNavigation() {
    this.navigationVisible = true;
  }
  closeNavigation() {
    this.navigationVisible = false;
  }
}
