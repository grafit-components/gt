import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskDropdownComponent, ItskDropdownContentDirective, ItskDropdownHeadDirective, ItskToggleComponent } from '@grafit/components';

@Component({
  selector: 'app-dropdown-guard',
  imports: [ItskDropdownComponent, ItskDropdownHeadDirective, ItskDropdownContentDirective, ItskToggleComponent, FormsModule],
  template: `
    <itsk-toggle [(ngModel)]="allowed">Разрешить открытие</itsk-toggle>
    <br />
    <itsk-dropdown [canOpen]="canOpen" [autoClose]="false" style="display: inline-block">
      <ng-template itskDropdownHead>
        <button class="button_default">Открыть / закрыть</button>
      </ng-template>
      <ng-template itskDropdownContent>
        <div class="padding-3">Не закрывается по клику снаружи — только по кнопке.</div>
      </ng-template>
    </itsk-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownGuardComponent {
  protected allowed = true;

  /** Функция вызывается при каждой попытке открытия; может вернуть и `Promise<boolean>` */
  protected canOpen = () => this.allowed;
}
