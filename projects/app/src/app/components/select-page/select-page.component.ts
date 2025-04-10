import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectMultipleComponent } from '../../samples/select/select-multiple/select-multiple.component';
import { SelectComponent } from '../../samples/select/select/select.component';
import {TreeSelectComponent} from "../../samples/select/tree-select/tree-select.component";

@Component({
  selector: 'app-select-page',
  imports: [SelectComponent, SelectMultipleComponent, TreeSelectComponent],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {}
