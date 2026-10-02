import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskValidateDirective } from '@grafit/components';

@Component({
  selector: 'app-validate-basic',
  imports: [ItskValidateDirective, FormsModule],
  // тексты сообщений привязаны после error и warn намеренно: если текст уже задан, а error сразу равен true,
  // директива пытается вывести сообщение до создания обёртки и падает.
  // disabled сброшен в undefined тоже намеренно: значение по умолчанию false выставляет атрибут disabled="false",
  // и браузер блокирует поле
  template: `
    <div style="width: 320px">
      <input
        class="input__field"
        placeholder="Логин"
        [(ngModel)]="login"
        itskValidate
        [required]="true"
        [markGood]="true"
        [error]="!login"
        [warn]="login.length > 0 && login.length < 4"
        [errorMessage]="'Поле обязательно для ввода'"
        [warningMessage]="'Рекомендуем логин не короче 4 символов'"
        [disabled]="$any(undefined)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateBasicComponent {
  protected login = '';
}
