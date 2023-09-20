import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'itsk-list-group',
  templateUrl: './itsk-list-group.component.html',
  styleUrls: ['./itsk-list-group.component.scss']
})
export class ItskListGroupComponent implements OnInit {
  @HostBinding('class.list__group') classListGroup = true;

  constructor() {
  }

  ngOnInit() {
  }

}
