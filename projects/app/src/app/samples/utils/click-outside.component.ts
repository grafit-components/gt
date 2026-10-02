import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskClickOutsideDirective } from '@grafit/components';

@Component({
  selector: 'app-click-outside',
  imports: [ItskClickOutsideDirective],
  template: `
    <div
      class="border-1px border-color_default padding-5"
      style="width: 320px"
      [rightClick]="true"
      [visible]="true"
      (itskClickOutside)="outside = outside + 1"
    >
      Кликните за пределами этого блока левой или правой кнопкой.
    </div>
    <br />
    Кликов снаружи: {{ outside }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickOutsideComponent {
  protected outside = 0;
}
