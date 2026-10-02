import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskSelectComponent } from '@grafit/components';

@Component({
  selector: 'app-select-placeholder',
  imports: [ItskSelectComponent, FormsModule, JsonPipe],
  templateUrl: './select-placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlaceholderComponent implements OnInit {
  protected items: SelectOption[] = [];

  protected selectedValue: number | undefined | null;

  protected disabled = false;

  ngOnInit(): void {
    this.items = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
    ];
  }
}

interface SelectOption {
  value: number;
  label: string;
}
