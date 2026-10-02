import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePickerBasicComponent } from '../../samples/date-picker/date-picker-basic.component';
import { DatePickerLimitsComponent } from '../../samples/date-picker/date-picker-limits.component';
import { DatePickerTimeComponent } from '../../samples/date-picker/date-picker-time.component';
import { DateTimeInputComponent } from '../../samples/date-picker/date-time-input.component';
import { MonthPickerComponent } from '../../samples/date-picker/month-picker.component';
import { ApiRow, DOC_IMPORTS, sample } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-date-picker-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Формы" title="ItskDatePickerComponent">
      <p lead>
        Семейство компонентов для ввода даты и времени: <code>itsk-date-picker</code> с календарём, <code>itsk-month-picker</code> для
        выбора месяца и поля <code>itsk-date-input</code> / <code>itsk-time-input</code> без календаря. Все работают с объектом
        <code>Date</code> и реализуют <code>ControlValueAccessor</code>.
      </p>

      <app-doc-section title="Выбор даты">
        <p class="margin-b-3">
          Привяжите модель типа <code>Date</code>. Дату можно ввести с клавиатуры по маске или выбрать в календаре, который открывается по
          иконке. Кнопка очистки записывает в модель <code>null</code>; скрыть её можно через <code>[showClear]="false"</code>.
        </p>
        <app-sample [options]="basicSample" />
      </app-doc-section>

      <app-doc-section title="Дата и время">
        <p class="margin-b-3"><code>showTime</code> добавляет ввод часов и минут, <code>showSeconds</code> — ещё и секунд.</p>
        <app-sample [options]="timeSample" />
      </app-doc-section>

      <app-doc-section title="Ограничения">
        <p class="margin-b-3">
          Доступный диапазон задают <code>minDate</code> и <code>maxDate</code>. Отдельные даты исключаются через
          <code>disabledDates</code>, периоды — через <code>disabledPeriods</code> (массив <code>ItskDatePeriod</code>), дни недели — через
          <code>disabledDays</code> (номера как в <code>Date.getDay()</code>: 0 — воскресенье).
        </p>
        <p class="margin-b-3">
          Если пустое значение недопустимо, задайте <code>[allowNull]="false"</code> и <code>defaultDate</code> — она подставится, когда
          модель пуста.
        </p>
        <app-sample [options]="limitsSample" />
      </app-doc-section>

      <app-doc-section title="Выбор месяца">
        <p class="margin-b-3">
          <code>itsk-month-picker</code> выбирает месяц и год. В модель записывается <code>Date</code> с выбранным месяцем.
        </p>
        <app-sample [options]="monthSample" />
      </app-doc-section>

      <app-doc-section title="Поля без календаря">
        <p class="margin-b-3">
          <code>itsk-date-input</code> и <code>itsk-time-input</code> — поля ввода по маске без выпадающего календаря. Их же
          <code>itsk-date-picker</code> использует внутри себя.
        </p>
        <app-sample [options]="inputSample" />
      </app-doc-section>

      <app-doc-section title="Локализация">
        <p class="margin-b-0">
          Названия месяцев, дней недели и подпись кнопки «Сегодня» берутся из <code>PickerLocaleService</code>. По умолчанию они английские.
          Чтобы заменить их, один раз при старте приложения вызовите <code>PickerLocaleService.setLocale()</code> с объектом
          <code>ItskPickerLocaleModel</code> — настройка общая для всех календарей.
        </p>
      </app-doc-section>

      <app-doc-section title="API">
        <app-api-table title="ItskDatePickerComponent" [rows]="datePickerInputs" />
        <app-api-table title="ItskMonthPickerComponent" [rows]="monthPickerInputs" />
        <app-api-table title="ItskDateInputComponent" [rows]="dateInputInputs" />
        <app-api-table title="ItskTimeInputComponent" [rows]="timeInputInputs" />
      </app-doc-section>
    </app-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerPageComponent {
  basicSample = sample('Выбор даты', DatePickerBasicComponent, 'date-picker/date-picker-basic');
  timeSample = sample('Дата и время', DatePickerTimeComponent, 'date-picker/date-picker-time');
  limitsSample = sample('Диапазон ±2 недели без выходных', DatePickerLimitsComponent, 'date-picker/date-picker-limits');
  monthSample = sample('Выбор месяца', MonthPickerComponent, 'date-picker/month-picker');
  inputSample = sample('Поля ввода даты и времени', DateTimeInputComponent, 'date-picker/date-time-input');

  datePickerInputs: ApiRow[] = [
    { name: 'showIcon', type: 'boolean', default: 'true', description: 'Показывать иконку календаря' },
    { name: 'showClear', type: 'boolean', default: 'true', description: 'Показывать кнопку очистки' },
    { name: 'icon', type: 'string', default: "'icon-calendar-date'", description: 'Имя иконки' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать компонент' },
    { name: 'firstDayOfWeek', type: 'number', default: '1', description: 'Первый день недели (0 — воскресенье)' },
    { name: 'minDate', type: 'Date', description: 'Минимальная доступная дата' },
    { name: 'maxDate', type: 'Date', description: 'Максимальная доступная дата' },
    { name: 'minYearDate', type: 'Date', description: 'Минимальный доступный год в виде даты' },
    { name: 'maxYearDate', type: 'Date', description: 'Максимальный доступный год в виде даты' },
    { name: 'disabledDates', type: 'Date[]', description: 'Даты, недоступные для выбора' },
    { name: 'disabledPeriods', type: 'ItskDatePeriod[]', description: 'Периоды, недоступные для выбора' },
    { name: 'disabledDays', type: 'number[]', description: 'Дни недели, недоступные для выбора' },
    { name: 'showTime', type: 'boolean', default: 'false', description: 'Показывать ввод времени' },
    { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Показывать ввод секунд' },
    { name: 'allowNull', type: 'boolean', default: 'true', description: 'Разрешить пустое значение' },
    { name: 'defaultDate', type: 'Date', description: 'Значение для пустой модели при allowNull = false' },
    { name: 'fixed', type: 'boolean', default: 'false', description: 'Позиционировать календарь через position: fixed' },
    { name: 'align', type: 'ItskAlign.Left | ItskAlign.Right', default: 'ItskAlign.Left', description: 'Выравнивание календаря' },
  ];

  monthPickerInputs: ApiRow[] = [
    { name: 'showIcon', type: 'boolean', default: 'true', description: 'Показывать иконку календаря' },
    { name: 'showClear', type: 'boolean', default: 'true', description: 'Показывать кнопку очистки' },
    { name: 'icon', type: 'string', default: "'icon-calendar_16'", description: 'Имя иконки' },
    { name: 'className', type: 'string[]', default: '[]', description: 'CSS-классы для поля ввода' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать компонент' },
    { name: 'minDate', type: 'Date', description: 'Минимальная доступная дата' },
    { name: 'maxDate', type: 'Date', description: 'Максимальная доступная дата' },
    { name: 'showToday', type: 'boolean', default: 'true', description: 'Показывать кнопку выбора текущего месяца' },
    { name: 'fixed', type: 'boolean', default: 'true', description: 'Позиционировать календарь через position: fixed' },
  ];

  dateInputInputs: ApiRow[] = [
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать поле' },
    { name: 'showTime', type: 'boolean', default: 'false', description: 'Показывать ввод времени' },
    { name: 'allowNull', type: 'boolean', default: 'false', description: 'Разрешить пустое значение' },
    { name: 'minYear', type: 'number', description: 'Минимальный год' },
    { name: 'maxYear', type: 'number', description: 'Максимальный год' },
  ];

  timeInputInputs: ApiRow[] = [
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Заблокировать поле' },
    { name: 'showSecond', type: 'boolean', default: 'false', description: 'Показывать ввод секунд' },
  ];
}
