import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskAutocompleteComponent } from '@grafit/components';

@Component({
  selector: 'app-autocomplete-basic',
  imports: [ItskAutocompleteComponent, FormsModule],
  template: `
    <itsk-autocomplete [(ngModel)]="city" [values]="cities" [disabled]="disabled" />
    <br />
    Value: {{ city }}
    <br />
    <button class="button_default" (click)="disabled = !disabled">{{ disabled ? 'Разблокировать' : 'Заблокировать' }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteBasicComponent {
  protected cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Тюмень', 'Уфа', 'Пермь'];

  protected city = '';

  protected disabled = false;
}
