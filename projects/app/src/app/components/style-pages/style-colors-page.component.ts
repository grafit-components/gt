import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, signal, viewChildren } from '@angular/core';
import { ApiRow, DOC_IMPORTS } from '../../shared/doc/doc.components';

interface SwatchColors {
  background: string;
  color: string;
  border: string;
}

@Component({
  selector: 'app-style-colors-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Стили" title="Цвета">
      <p lead>
        Палитра задаётся картой <code>$blocks</code> темы: два блока, в каждом девять акцентов, у каждого акцента цвет фона, текста и рамки.
        Образцы ниже нарисованы служебными классами библиотеки, а значения прочитаны со страницы — переключите тему, и они изменятся.
      </p>

      @for (block of blocks; track block.name) {
        <app-doc-section [title]="block.title">
          <p class="margin-b-3">{{ block.description }}</p>
          <div class="swatches" [class]="'block-' + block.name">
            @for (accent of accents; track accent) {
              <div>
                <div
                  #swatch
                  class="swatch border-1px"
                  [attr.data-key]="block.name + '.' + accent"
                  [class]="'background-color_' + accent + ' color_' + accent + ' border-color_' + accent"
                >
                  {{ accent }}
                </div>
                @if (colors()[block.name + '.' + accent]; as value) {
                  <div class="swatch__values">
                    фон {{ value.background }}<br />
                    текст {{ value.color }}<br />
                    рамка {{ value.border }}
                  </div>
                }
              </div>
            }
          </div>
        </app-doc-section>
      }

      <app-doc-section title="Классы">
        <p class="margin-b-3">
          Для каждого акцента есть три класса — по одному на свойство. Без обёртки они берут цвета блока <code>work</code>, внутри элемента
          с классом <code>block-main</code> — цвета блока <code>main</code>. Все классы выставляют значение с <code>!important</code>.
        </p>
        <app-doc-code [code]="classesCode" />
        <app-api-table title="Шаблоны имён" nameLabel="Класс" [rows]="classes" />
      </app-doc-section>
    </app-doc-page>
  `,
  styles: `
    .swatches {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1.2rem;
    }

    .swatch {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 5.6rem;
      border-radius: 0.4rem;
      font-weight: 500;
    }

    .swatch__values {
      margin-top: 0.4rem;
      font-family: 'Roboto Mono', monospace;
      font-size: 1.1rem;
      opacity: 0.8;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleColorsPageComponent implements OnDestroy {
  private readonly swatches = viewChildren<ElementRef<HTMLElement>>('swatch');
  private readonly themeLink = document.querySelector('link#client-theme');

  protected readonly colors = signal<Record<string, SwatchColors>>({});

  blocks = [
    { name: 'work', title: 'Блок work', description: 'Рабочая область. Эти цвета действуют по умолчанию, без дополнительных классов.' },
    { name: 'main', title: 'Блок main', description: 'Контрастные панели. Цвета включаются классом block-main на родителе.' },
  ];

  accents = ['default', 'secondary', 'primary', 'ghost', 'success', 'warning', 'error', 'info', 'focus'];

  classesCode = `<span class="color_error">Текст цвета ошибки</span>

<div class="background-color_info border-1px border-color_info">Информационный блок</div>

<div class="block-main">
  <span class="color_primary">Акцент primary из блока main</span>
</div>`;

  classes: ApiRow[] = [
    { name: 'color_<акцент>', description: 'Цвет текста' },
    { name: 'background-color_<акцент>', description: 'Цвет фона' },
    { name: 'border-color_<акцент>', description: 'Цвет рамки; саму рамку задают классы border-1px и подобные' },
    { name: 'block-main, block-work', description: 'Переключают вложенные элементы на цвета блока' },
  ];

  constructor() {
    afterNextRender(() => this.readColors());
    // после смены темы подключается другой CSS-файл — перечитываем значения, когда он загрузится
    this.themeLink?.addEventListener('load', this.readColors);
  }

  ngOnDestroy() {
    this.themeLink?.removeEventListener('load', this.readColors);
  }

  private readColors = () => {
    const result: Record<string, SwatchColors> = {};
    for (const { nativeElement } of this.swatches()) {
      const style = getComputedStyle(nativeElement);
      result[nativeElement.dataset['key']!] = {
        background: toHex(style.backgroundColor),
        color: toHex(style.color),
        border: toHex(style.borderTopColor),
      };
    }
    this.colors.set(result);
  };
}

/** `rgb(47, 86, 119)` → `#2f5677` */
function toHex(rgb: string): string {
  const parts = rgb.match(/\d+/g)?.slice(0, 3) ?? [];
  return '#' + parts.map((part) => Number(part).toString(16).padStart(2, '0')).join('');
}
