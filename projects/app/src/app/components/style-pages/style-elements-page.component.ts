import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskIconComponent } from '@grafit/components';
import { ApiRow, DOC_IMPORTS } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-style-elements-page',
  imports: [DOC_IMPORTS, ItskIconComponent],
  template: `
    <app-doc-page group="Стили" title="Плашки, метки и индикаторы">
      <p lead>
        Готовые классы для небольших элементов интерфейса, у которых нет своего компонента: плашки с рамкой и фоном, цветные метки,
        индикатор загрузки, карточки, ссылки и перекраска иконок. Цвета берутся из акцентов темы.
      </p>

      <app-doc-section title="Плашки">
        <p class="margin-b-3">
          <code>base-shape</code> задаёт элементу фон, цвет текста, рамку и скругление акцента <code>default</code>. Класс
          <code>base-shape_&lt;акцент&gt;</code> делает то же цветами другого акцента, но без скругления — добавьте
          <code>border-radius-1</code>. Суффикс <code>_active</code> затемняет или осветляет фон на 10 %.
        </p>
        <div class="demo-row margin-b-3">
          <div class="base-shape padding-3">base-shape</div>
          @for (accent of shapeAccents; track accent) {
            <div class="padding-3 border-radius-1" [class]="'base-shape_' + accent">{{ accent }}</div>
          }
          <div class="base-shape base-shape_active padding-3">base-shape_active</div>
        </div>
        <app-doc-code [code]="shapeCode" />
      </app-doc-section>

      <app-doc-section title="Метки">
        <p class="margin-b-3">
          <code>marker_&lt;акцент&gt;</code> — строчная метка со скруглёнными краями для статусов и счётчиков. Высоту и шрифт задают
          соседние классы.
        </p>
        <div class="demo-row margin-b-3">
          @for (accent of accents; track accent) {
            <span class="height-6 font-caption" [class]="'marker_' + accent">{{ accent }}</span>
          }
        </div>
        <app-doc-code [code]="markerCode" />
      </app-doc-section>

      <app-doc-section title="Индикатор загрузки">
        <p class="margin-b-3">
          <code>loader</code> рисует вращающееся кольцо псевдоэлементом. Размер задаётся шагом шкалы отступов через
          <code>loader_space-N</code>, по умолчанию 24 пикселя. <code>loader_center</code> растягивает элемент на родителя с
          <code>position: relative</code>, закрывает его полупрозрачной подложкой и ставит кольцо в центр.
          <code>loader_color-light</code> делает кольцо светлым для тёмного фона.
        </p>
        <div class="demo-row margin-b-3">
          <div class="loader-cell"><span class="loader"></span></div>
          <div class="loader-cell"><span class="loader loader_space-4"></span></div>
          <div class="loader-cell"><span class="loader loader_space-10"></span></div>
          <div class="loader-cell background-color_primary"><span class="loader loader_color-light"></span></div>
          <div class="loader-box position-relative border-1px border-color_default padding-3">
            Содержимое блока
            <div class="loader loader_center"></div>
          </div>
        </div>
        <app-doc-code [code]="loaderCode" />
        <p class="margin-b-0">
          Подложка <code>loader_center</code> всегда белая с прозрачностью 50 % и в тёмной теме высветляет блок. Директива
          <code>itskSpinner</code> использует другой класс — <code>spinner</code>.
        </p>
      </app-doc-section>

      <app-doc-section title="Карточка">
        <p class="margin-b-3">
          <code>card</code> задаёт внутренние поля 12 пикселей и такие же отступы между дочерними элементами. Фон и рамку добавляет
          <code>base-shape</code>, тень — <code>shadow</code>.
        </p>
        <div class="card base-shape shadow margin-b-3" style="width: 28rem">
          <div class="font-title2">Отчёт за май</div>
          <div class="card-content">
            <p>Текст карточки.</p>
            <p>Второй абзац.</p>
          </div>
        </div>
        <app-doc-code [code]="cardCode" />
      </app-doc-section>

      <app-doc-section title="Ссылки и иконки">
        <p class="margin-b-3">
          Ссылки получают цвет акцента <code>info</code> без подчёркивания; класс <code>anchor</code> предназначен для ссылок-якорей с
          пунктирной линией. Иконка <code>itsk-icon</code> перекрашивается классом <code>color_&lt;акцент&gt;</code> на ней самой или на
          родителе.
        </p>
        <div class="demo-row margin-b-3">
          <a href="/style-elements" (click)="$event.preventDefault()">Обычная ссылка</a>
          <a class="anchor border-b-1px" href="/style-elements" (click)="$event.preventDefault()">Ссылка-якорь</a>
          @for (accent of iconAccents; track accent) {
            <itsk-icon name="icon-settings-star-gear-filled" [cssClass]="'color_' + accent" />
          }
        </div>
        <app-doc-code [code]="iconCode" />
      </app-doc-section>

      <app-doc-section title="Классы">
        <app-api-table title="Шаблоны имён" nameLabel="Класс" [rows]="classes" />
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

    .loader-cell {
      display: flex;
      align-items: flex-start;
      width: 5.6rem;
      height: 5.6rem;
      padding: 0.8rem;
    }

    .loader-box {
      width: 20rem;
      height: 8rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleElementsPageComponent {
  accents = ['default', 'secondary', 'primary', 'ghost', 'success', 'warning', 'error', 'info', 'focus'];

  shapeAccents = ['secondary', 'primary', 'success', 'warning', 'error', 'info'];

  iconAccents = ['default', 'success', 'warning', 'error', 'info'];

  shapeCode = `<div class="base-shape padding-3">Плашка по умолчанию</div>

<div class="base-shape_error border-radius-1 padding-3">Плашка цвета ошибки</div>`;

  markerCode = `<span class="marker_success height-6 font-caption">Выполнено</span>
<span class="marker_error height-6 font-caption">3 ошибки</span>`;

  loaderCode = `<span class="loader loader_space-4"></span>

<div class="position-relative">
  Содержимое блока
  <div class="loader loader_center"></div>
</div>`;

  cardCode = `<div class="card base-shape shadow">
  <div class="font-title2">Отчёт за май</div>
  <div class="card-content">
    <p>Текст карточки.</p>
  </div>
</div>`;

  iconCode = `<a href="/reports">Обычная ссылка</a>

<itsk-icon name="icon-settings-star-gear-filled" cssClass="color_error" />`;

  classes: ApiRow[] = [
    { name: 'base-shape', description: 'Плашка акцента default со скруглением 4 пикселя' },
    { name: 'base-shape_<акцент>', description: 'Плашка цветами акцента, без скругления' },
    { name: 'base-shape_active, base-shape_<акцент>_active', description: 'Фон активного состояния' },
    { name: 'marker_<акцент>', description: 'Строчная метка' },
    { name: 'loader', description: 'Вращающееся кольцо 24 пикселя' },
    { name: 'loader_space-0 … loader_space-14', description: 'Размер кольца по шкале отступов' },
    { name: 'loader_center', description: 'Подложка на весь родитель с кольцом в центре' },
    { name: 'loader_center-0 … loader_center-14', description: 'Центрирование кольца нестандартного размера внутри родителя' },
    { name: 'loader_color-light', description: 'Светлое кольцо' },
    { name: 'card, card-content', description: 'Поля карточки и отступы между её элементами' },
    {
      name: 'card-icon, card-img',
      description: 'Блок 64 пикселя под шрифтовую иконку (svg из itsk-icon не масштабирует) и картинка на всю ширину',
    },
    { name: 'shadow', description: 'Базовая тень: то же, что shadow-b-1' },
    { name: 'anchor', description: 'Ссылка-якорь с пунктирной нижней рамкой' },
    { name: 'icon', description: 'Размер 16 пикселей и цвет иконки; itsk-icon ставит его сам' },
  ];
}
