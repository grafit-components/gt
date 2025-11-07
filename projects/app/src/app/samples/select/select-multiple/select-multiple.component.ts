import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskSelectComponent } from '@grafit/components';

@Component({
  selector: 'app-select-multiple',
  imports: [JsonPipe, ItskSelectComponent, FormsModule],
  templateUrl: './select-multiple.component.html',
  styleUrl: './select-multiple.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultipleComponent {
  protected items: SelectOption[] = [];

  protected selectedValue: number | undefined | null;

  protected initItems() {
    this.items = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three with long label that will wrap' },
      { value: 4, label: 'Four' },
    ];
  }

  ngOnInit(): void {
    this.initItems();
  }
}

interface SelectOption {
  value: number;
  label: string;
}
