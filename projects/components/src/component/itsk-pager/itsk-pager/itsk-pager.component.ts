import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ItskPagerConfigService } from '../itsk-pager-config.service';
import { ItskPagerConfig } from '../model/itsk-pager-config';
import { Paging } from '../model/paging';

@Component({
  selector: 'itsk-pager',
  templateUrl: './itsk-pager.component.html',
  styleUrls: ['./itsk-pager.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItskPagerComponent implements OnInit {
  /** Настройки пагинатора */
  private paging$: Paging = new Paging();
  @HostBinding('class.pager') pagerClass = true;

  @Input()
  set paging(value: Paging) {
    this.paging$ = new Paging(value);
    this.pageNum = this.paging$.page;
  }

  get paging(): Paging {
    return this.paging$;
  }

  @Input() pageSizeSelection = true;

  @Input() pageSizeList: number[] = [];

  get _pageSizeList(): number[] {
    if (Array.isArray(this.pageSizeList) && this.pageSizeList.length > 0) {
      return this.pageSizeList;
    }
    return [25, 50, 75, 100];
  }

  /** Обратный вызов обновления настроек пагинатора */
  @Output() pagingChange = new EventEmitter<any>();

  pageNum: number = 0;

  /** Выбор страницы в процессе */
  pageSelection = false;

  config: Observable<ItskPagerConfig>;

  constructor(private svc$: ItskPagerConfigService) {
    this.config = this.svc$.config;
  }

  ngOnInit() {
    this.pageNum = this.paging$.page;
  }

  paginate(paging: Paging) {
    this.pageNum = paging.page;
    this.pagingChange.emit(paging);
  }

  paginateToPage(page: number) {
    this.paginate(
      Object.assign(this.paging, {
        page,
      }),
    );
  }

  setPageSize(pageSize: number) {
    this.paginate(
      Object.assign(this.paging, {
        pageSize,
        count: Math.ceil(this.paging.totalCount / pageSize),
        page: 0,
      }),
    );
    this.endPageSelection();
  }

  startPageSelection(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.pageSelection) {
      this.pageSelection = true;
    }
  }

  endPageSelection() {
    this.pageSelection = false;
  }
}
