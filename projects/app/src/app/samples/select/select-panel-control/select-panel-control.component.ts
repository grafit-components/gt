import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskSelectComponent } from '@grafit/components';

@Component({
  selector: 'app-select-panel-control',
  imports: [ItskSelectComponent, FormsModule],
  templateUrl: './select-panel-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPanelControlComponent implements OnInit {
  protected items: SelectOption[] = [];

  protected selectedValue: number | undefined | null;

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
