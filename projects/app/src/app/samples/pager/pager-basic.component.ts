import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskPagerComponent, Paging } from '@grafit/components';

const TOTAL = 240;

@Component({
  selector: 'app-pager-basic',
  imports: [ItskPagerComponent],
  template: `
    <itsk-pager [paging]="paging" [pageSizeList]="[10, 20, 50]" (pagingChange)="paging = $event" />
    <br />
    Записи {{ paging.page * paging.pageSize + 1 }}–{{ lastRecord }} из {{ paging.totalCount }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerBasicComponent {
  /** Номер страницы считается с нуля. Количество страниц `count` компонент сам не вычисляет — его нужно передать */
  protected paging = new Paging({ page: 0, pageSize: 20, totalCount: TOTAL, count: Math.ceil(TOTAL / 20) });

  protected get lastRecord() {
    return Math.min((this.paging.page + 1) * this.paging.pageSize, this.paging.totalCount);
  }
}
