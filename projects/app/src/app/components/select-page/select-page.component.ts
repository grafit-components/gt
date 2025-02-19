import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectMultipleComponent } from '../../samples/select/select-multiple/select-multiple.component';
import { SelectComponent } from '../../samples/select/select/select.component';

@Component({
  selector: 'app-select-page',
  imports: [SelectComponent, SelectMultipleComponent],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {}
