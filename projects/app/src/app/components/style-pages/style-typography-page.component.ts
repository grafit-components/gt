import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, DOC_IMPORTS } from '../../shared/doc/doc.components';

@Component({
  selector: 'app-style-typography-page',
  imports: [DOC_IMPORTS],
  template: `
    <app-doc-page group="Стили" title="Типографика">
      <p lead>
        Шрифт библиотеки — Roboto. Корневой размер равен <code>10px</code>, поэтому размеры в <code>rem</code> легко переводятся в пиксели:
        <code>1.4rem</code> — это 14 пикселей. Для текста есть 17 готовых стилей, каждый доступен классом <code>font-*</code> и Sass-картой
        <code>$font-*</code>.
      </p>

      <app-doc-section title="Шкала">
        <p class="margin-b-3">
          Класс задаёт размер, межстрочный интервал и насыщенность с <code>!important</code>. Обычный текст страницы без классов —
          <code>1.2rem</code> с интервалом <code>1.5</code>.
        </p>
        <table class="table">
          <thead>
            <tr>
              <th>Класс</th>
              <th>Размер / интервал</th>
              <th>Насыщенность</th>
              <th>Пример</th>
            </tr>
          </thead>
          <tbody>
            @for (font of fonts; track font.name) {
              <tr>
                <td>
                  <code>font-{{ font.name }}</code>
                </td>
                <td>{{ font.size }} / {{ font.lineHeight }}</td>
                <td>{{ font.weight }}</td>
                <td class="sample"><span [class]="'font-' + font.name">Скважина 142</span></td>
              </tr>
            }
          </tbody>
        </table>
      </app-doc-section>

      <app-doc-section title="Использование">
        <p class="margin-b-3">В разметке — классом, в стилях компонента — миксином <code>fontHelper</code>:</p>
        <app-doc-code [code]="htmlCode" />
        <app-doc-code [code]="scssCode" lang="scss" />
      </app-doc-section>

      <app-doc-section title="Работа с текстом">
        <app-api-table title="Служебные классы" nameLabel="Класс" [rows]="textClasses" />
      </app-doc-section>
    </app-doc-page>
  `,
  styles: `
    .sample {
      max-width: 36rem;
      overflow: hidden;
      white-space: nowrap;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleTypographyPageComponent {
  fonts = [
    { name: 'h1', size: '9.6rem', lineHeight: '11.2rem', weight: '300' },
    { name: 'h2', size: '6rem', lineHeight: '7rem', weight: '300' },
    { name: 'h3', size: '4.8rem', lineHeight: '5.6rem', weight: '300' },
    { name: 'h4', size: '3.4rem', lineHeight: '4rem', weight: '400' },
    { name: 'h5', size: '2.4rem', lineHeight: '3.6rem', weight: '400' },
    { name: 'h6', size: '2rem', lineHeight: '3.2rem', weight: '500' },
    { name: 'title1', size: '1.6rem', lineHeight: '2.8rem', weight: '400' },
    { name: 'title2', size: '1.4rem', lineHeight: '2rem', weight: '500' },
    { name: 'title3', size: '1.2rem', lineHeight: '1.6rem', weight: '700' },
    { name: 'body1', size: '1.6rem', lineHeight: '2.4rem', weight: '400' },
    { name: 'body2', size: '1.4rem', lineHeight: '1.6rem', weight: '400' },
    { name: 'body3', size: '1.2rem', lineHeight: '1.8rem', weight: '400' },
    { name: 'button1', size: '1.4rem', lineHeight: '1.6rem', weight: '500' },
    { name: 'button2', size: '1.2rem', lineHeight: '1.4rem', weight: '500' },
    { name: 'button3', size: '1.2rem', lineHeight: '1.4rem', weight: '400' },
    { name: 'caption', size: '1.2rem', lineHeight: '1.4rem', weight: '400' },
    { name: 'overline', size: '1rem', lineHeight: '1.2rem', weight: '400, прописные' },
  ];

  htmlCode = `<div class="font-title2">Заголовок раздела</div>
<div class="font-overline">Надпись над заголовком</div>`;

  scssCode = `@use '@grafit/components/styles/font' as font;
@use '@grafit/components/styles/util/font-util' as font-util;

.card__title {
  @include font-util.fontHelper(font.$font-title2);
}`;

  textClasses: ApiRow[] = [
    { name: 'text-align-left, -center, -right', description: 'Выравнивание текста' },
    { name: 'text-short', description: 'Одна строка с многоточием при переполнении' },
    { name: 'nowrap, white-space_nowrap', description: 'Запрет переноса строк' },
    { name: 'text-overflow_ellipsis', description: 'Многоточие при переполнении; перенос и overflow задаются отдельно' },
    { name: 'line-height-0 … line-height-14', description: 'Межстрочный интервал по шкале отступов' },
  ];
}
