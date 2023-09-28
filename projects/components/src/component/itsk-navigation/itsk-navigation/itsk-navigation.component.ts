import {Component, HostListener, Input, OnInit, ContentChild, ElementRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { NavigationData } from '../model/itsk-navigation-data';

@Component({
  selector: 'itsk-navigation',
  templateUrl: './itsk-navigation.component.html'
})
export class ItskNavigationComponent implements OnInit {

  @Input()
  navigationData?: NavigationData;

  @ContentChild('navHeaderCustom', {static: true}) headerTemplate: any;
  navigationVisible = false;

  @HostListener('click', ['$event']) clickHandler(e: any) {
    if ( e.target.classList.contains('navigation') ) {
      this.closeNavigation();
    }
  }

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
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
