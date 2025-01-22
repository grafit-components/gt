import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'itsk-list',
    templateUrl: './itsk-list.component.html',
    styleUrls: ['./itsk-list.component.scss'],
    standalone: false
})
export class ItskListComponent implements OnInit {
  @HostBinding('class.list') class = true;

  constructor() {}

  ngOnInit() {}
}
