import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'itsk-delimiter',
  template: ''
})
export class ItskDelimiterComponent implements OnInit {
  @HostBinding('class.list__delimiter') css = true;

  constructor() {
  }

  ngOnInit() {
  }
}
