import { Component, OnInit } from '@angular/core';
import { iconsList } from '../../icons-list';
import { ItskIconService } from '../../itsk-icon.service';

import { ItskIconComponent } from '../../itsk-icon/itsk-icon.component';

@Component({
    selector: 'itsk-icon-sample',
    templateUrl: './icon-sample.component.html',
    styleUrls: ['./icon-sample.component.scss'],
    imports: [ItskIconComponent]
})
export class IconSampleComponent implements OnInit {
  icons = iconsList;

  constructor(private iconsService: ItskIconService) {
    this.iconsService.addSprite('assets/icon.svg');
  }

  ngOnInit(): void {}
}
