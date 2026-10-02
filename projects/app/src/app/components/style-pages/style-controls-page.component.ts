import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskIconComponent } from '@grafit/components';
import { ApiRow, DOC_IMPORTS } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-style-controls-page',
  imports: [DOC_IMPORTS, ItskIconComponent],
  template: `
    <app-doc-page group="Стили" title="Кнопки и поля">
      <p lead>
        Кнопки и текстовые поля в библиотеке — не компоненты, а классы для обычных элементов <code>button</code>, <code>input</code>,
        <code>select</code> и <code>textarea</code>. Цвета берутся из акцентов темы.
      </p>

      <app-doc-section title="Кнопки">
        <p class="margin-b-3">
          Класс <code>button_&lt;акцент&gt;</code> оформляет кнопку цветами акцента. Чаще всего используются <code>button_primary</code> для
          главного действия, <code>button_default</code> и <code>button_secondary</code> для остальных, <code>button_ghost</code> для кнопок
          без заливки.
        </p>
        <div class="demo-row margin-b-3">
          @for (accent of accents; track accent) {
            <button [class]="'button_' + accent">{{ accent }}</button>
          }
        </div>
        <div class="demo-row margin-b-3">
          <button class="button_primary" disabled>disabled</button>
          <button class="button_default"><itsk-icon name="icon-settings-star-gear-filled" class="margin-r-2" /> С иконкой</button>
          <div class="button__group">
            <button class="button_default">День</button>
            <button class="button_default">Неделя</button>
            <button class="button_default">Месяц</button>
          </div>
        </div>
        <app-doc-code [code]="buttonCode" />
      </app-doc-section>

      <app-doc-section title="Поля ввода">
        <p class="margin-b-3">
          Поле получает класс <code>input__field</code> и оборачивается в <code>input</code>. Обёртка нужна для иконок, сообщения под полем
          и отметки обязательности. Подпись над полем оформляется блоком <code>control__label</code>.
        </p>
        <div class="fields margin-b-3">
          <label class="control__label">
            <span class="control__label__text">Обычное поле</span>
            <div class="input"><input class="input__field" placeholder="Текст подсказки" /></div>
          </label>
          <label class="control__label">
            <span class="control__label__text">Обязательное с ошибкой</span>
            <div class="input input_required">
              <input class="input__field input__field_error" value="abc" />
              <div class="input__helper">Поле заполнено неверно</div>
            </div>
          </label>
          <label class="control__label">
            <span class="control__label__text">С иконкой и предупреждением</span>
            <div class="input">
              <itsk-icon name="icon-user-filled" class="input__icon input__icon-left display-flex align-center justify-content-center" />
              <input class="input__field input__field_icon_left input__field_warning" value="Иванов" />
            </div>
          </label>
          <label class="control__label">
            <span class="control__label__text">Заблокированное</span>
            <div class="input"><input class="input__field" value="Нельзя изменить" disabled /></div>
          </label>
          <label class="control__label">
            <span class="control__label__text">Список</span>
            <div class="input">
              <select class="input__field">
                <option>Первый</option>
                <option>Второй</option>
              </select>
            </div>
          </label>
          <label class="control__label">
            <span class="control__label__text">Многострочное</span>
            <div class="input"><textarea class="input__field input__field_textarea" rows="3">Несколько строк текста</textarea></div>
          </label>
        </div>
        <app-doc-code [code]="inputCode" />
        <app-api-table title="Классы полей" nameLabel="Класс" [rows]="inputClasses" />
      </app-doc-section>
    </app-doc-page>
  `,
  styles: `
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.2rem;
    }

    .fields {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
      gap: 1.6rem 2.4rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleControlsPageComponent {
  accents = ['default', 'secondary', 'primary', 'ghost', 'success', 'warning', 'error', 'info'];

  buttonCode = `<button class="button_primary">Сохранить</button>
<button class="button_default">Отмена</button>

<div class="button__group">
  <button class="button_default">День</button>
  <button class="button_default">Неделя</button>
</div>`;

  inputCode = `<label class="control__label">
  <span class="control__label__text">Скважина</span>
  <div class="input input_required">
    <input class="input__field input__field_error" />
    <div class="input__helper">Поле обязательно для ввода</div>
  </div>
</label>`;

  inputClasses: ApiRow[] = [
    { name: 'input', description: 'Обёртка поля' },
    { name: 'input_required, input_optional', description: 'Звёздочка над полем: красная или зелёная' },
    { name: 'input__field', description: 'Само поле: input, select или textarea' },
    { name: 'input__field_error, input__field_warning', description: 'Рамка цвета ошибки или предупреждения' },
    { name: 'input__field_textarea', description: 'Многострочное поле без изменения размера' },
    { name: 'input__field_icon_left, input__field_icon_right', description: 'Место под иконку внутри поля' },
    { name: 'input__icon, input__icon-left, input__icon-right', description: 'Иконка внутри поля' },
    { name: 'input__helper', description: 'Сообщение под полем' },
    { name: 'control__label, control__label__text', description: 'Блок подписи и её текст' },
    { name: 'control__label_inline', description: 'Подпись слева от поля, а не над ним' },
  ];
}
