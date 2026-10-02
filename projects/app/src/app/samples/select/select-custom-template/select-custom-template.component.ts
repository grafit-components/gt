import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskSelectComponent } from '@grafit/components';

@Component({
  selector: 'app-select-custom-template',
  imports: [ItskSelectComponent, FormsModule, JsonPipe],
  templateUrl: './select-custom-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCustomTemplateComponent implements OnInit {
  protected items: User[] = [];

  protected selectedValue: number | undefined | null;

  ngOnInit(): void {
    this.items = [
      { id: 1, name: 'Алексей', role: 'Администратор' },
      { id: 2, name: 'Мария', role: 'Редактор' },
      { id: 3, name: 'Иван', role: 'Гость' },
    ];
  }
}

interface User {
  id: number;
  name: string;
  role: string;
}
