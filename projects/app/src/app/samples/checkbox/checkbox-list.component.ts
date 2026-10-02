import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskCheckboxComponent } from '@grafit/components';

@Component({
  selector: 'app-checkbox-list',
  imports: [ItskCheckboxComponent, FormsModule, JsonPipe],
  template: `
    @for (color of colors; track color) {
      <itsk-checkbox [(ngModel)]="selected" [value]="color">{{ color }}</itsk-checkbox>
      <br />
    }
    Selected: {{ selected | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxListComponent {
  protected colors = ['Красный', 'Зелёный', 'Синий'];

  protected selected: string[] = ['Зелёный'];
}
