import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'itsk-list-item',
  templateUrl: './itsk-list-item.component.html',
  styleUrls: ['./itsk-list-item.component.scss'],
})
export class ItskListItemComponent implements OnInit {
  @HostBinding('class.list__item') class = true;

  constructor() {}

  ngOnInit() {}
}
