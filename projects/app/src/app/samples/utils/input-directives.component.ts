import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskDisableControlDirective, ItskFocusDirective, ItskOnlyNumberDirective } from '@grafit/components';

@Component({
  selector: 'app-input-directives',
  imports: [ItskOnlyNumberDirective, ItskDisableControlDirective, ItskFocusDirective, FormsModule],
  template: `
    <div style="width: 320px">
      <input class="input__field margin-b-2" placeholder="Только число" [(ngModel)]="amount" itskOnlyNumber />

      <input class="input__field margin-b-2" placeholder="Только цифры" [(ngModel)]="digits" itskOnlyNumber="^[0-9]*$" />

      <input
        class="input__field margin-b-2"
        placeholder="Комментарий"
        [(ngModel)]="comment"
        [itskDisableControl]="disabled"
        itskFocus
        [appItskFocus]="focused"
        (blur)="focused = false"
      />
    </div>
    <button class="button_default margin-r-2" (click)="disabled = !disabled">
      {{ disabled ? 'Разблокировать комментарий' : 'Заблокировать комментарий' }}
    </button>
    <button class="button_default" (click)="focused = true">Фокус на комментарий</button>
    <br />
    Amount: {{ amount }}, digits: {{ digits }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDirectivesComponent {
  protected amount = '';

  protected digits = '';

  protected comment = '';

  protected disabled = false;

  protected focused = false;
}
