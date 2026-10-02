import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskSelectComponent } from '@grafit/components';

@Component({
  selector: 'app-select-virtual',
  imports: [ItskSelectComponent, FormsModule, JsonPipe],
  templateUrl: './select-virtual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectVirtualComponent implements OnInit {
  protected items: SelectOption[] = [];

  protected selectedValue: number | undefined | null;

  ngOnInit(): void {
    this.items = Array.from({ length: 1000 }, (_, i) => ({ value: i, label: `Элемент ${i + 1}` }));
  }
}

interface SelectOption {
  value: number;
  label: string;
}
