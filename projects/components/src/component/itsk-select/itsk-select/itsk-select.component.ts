import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ItskIconComponent } from '../../itsk-icon/itsk-icon/itsk-icon.component';
import { ItskMarkDirective } from '../../itsk-shared/itsk-mark.directive';
import { ItskSelectOptionDirective } from '../directive/itsk-select-option.directive';
import { ItskSelectValueDirective } from '../directive/itsk-select-value.directive';

enum ViewType {
  inline,
  inlineMulti,
  block,
  template,
  templateMulti,
  notSelected,
  notSelectedTemplate,
}

@Component({
  selector: 'itsk-select',
  templateUrl: './itsk-select.component.html',
  styleUrls: ['./itsk-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItskSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgSwitch,
    NgIf,
    NgTemplateOutlet,
    NgSwitchCase,
    NgFor,
    ItskIconComponent,
    FormsModule,
    ItskMarkDirective,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
  ],
})
export class ItskSelectComponent implements ControlValueAccessor, OnInit {
  private items$?: any[];
  private disabled$ = false;
  private multiple$ = false;
  private textPath$?: string;
  private searchTextSub$ = new Subject<string | null>();
  private searchTextSubscription$: Subscription | null = null;
  private searchText$: string | null = null;
  private rawNgModel$: any;
  viewItems$: any[] = [];
  textTemplate$?: TemplateRef<any>;
  viewTypeEnum$ = ViewType;
  selectedItem$: any | any[] = null;
  focusedItem$: any;
  focusedIndex$: number | null = null;
  focused$ = false;
  itemsCount = 0;
  private panelOpen$ = false;

  @ViewChild('searchInput', { static: false }) private searchInput$?: ElementRef<HTMLInputElement>;
  @ViewChild(CdkVirtualScrollViewport, { static: false }) private virtualViewport$?: CdkVirtualScrollViewport;

  @ContentChild(ItskSelectValueDirective, { static: true }) valueTemplate?: ItskSelectValueDirective;
  @ContentChild(ItskSelectOptionDirective, { static: true }) optionTemplate?: ItskSelectOptionDirective;

  //#region Inputs

  @HostBinding('tabindex') tabindex = 0;

  @HostBinding('class.select') selectClass = true;

  /** Высота в `px` элемента выпадающего списка */
  @Input() itemSize = 32;

  /** Максимальная высота области прокрутки */
  @Input() height = this.itemSize * 8;

  /** @deprecated Не используется, будет удалено */
  @Input() fixed = false;

  /** Данные для отображения */
  @Input() set items(val: any[] | undefined) {
    this.items$ = val ?? [];
    this.itemsCount = val ? val.length : 0;
    this.height = this.itemSize * (this.itemsCount > 8 ? 8 : this.itemsCount) + 7;
    this.searchText$ = null;
    this.viewItems$ = this.items$;
    this.writeValue(this.rawNgModel$);
  }

  get items() {
    return this.items$;
  }

  @Input()
  get panelOpen() {
    return this.panelOpen$;
  }

  set panelOpen(val) {
    if (val) {
      this.open();
    } else {
      this.close();
    }
  }

  /** Поиск по элементам */
  @Input() searchRef?: string | ((item: any) => string);

  /** Шаблон или текст выводящийся если нет выбранных, по умолчанию пустая строка */
  @Input() placeholder?: string | TemplateRef<any>;

  /** Для отображения выделенного */
  @Input() selectedRef?: TemplateRef<any> | 'block';

  /** Спользовать virtual scroll */
  @Input() virtual = false;

  /** Возможность стереть значение(я) */
  @Input() showClearButton = false;

  private valueRef$ = (item: any) => item;

  /** Шаблон для отображения */
  @Input() set valueRef(value: ((item: any) => any) | string) {
    switch (typeof value) {
      case 'string':
        this.valueRef$ = (item) => this.fetchFromObject(item, value);
        break;
      case 'function':
        this.valueRef$ = value;
        break;
      default:
        throw new Error('Неподдерживаемый тип');
    }
  }

  get valueRef() {
    return this.valueRef$;
  }

  /** Шаблон для отображения */
  @Input() set textRef(val: TemplateRef<any> | string) {
    if (val instanceof TemplateRef) {
      this.textTemplate$ = val;
    }
    if (typeof val === 'string') {
      this.textPath$ = val;
    }
  }

  /** Доступность селекта, по умолчанию `false` */
  @HostBinding('class.select_disabled')
  @Input()
  set disabled(value: boolean) {
    // console.log('disabled');
    this.disabled$ = value;
    this.close();
  }

  get disabled() {
    return this.disabled$;
  }

  /** Возможность множественного выбора, по умолчанию `false` */
  @HostBinding('class.select_multiple')
  @Input()
  set multiple(value: boolean) {
    if (this.multiple$ !== value) {
      if (this.selectedItem$) {
        throw new Error('Нельзя менять режим `multiple` после инициализации');
      }
      this.multiple$ = value;
      if (this.multiple) {
        this.selectedItem$ = [];
      }
    }
  }

  get multiple() {
    return this.multiple$;
  }

  //#endregion

  //#region Props

  get hasSearch() {
    return !!this.searchRef;
  }

  set searchText(value: string | null) {
    this.searchTextSub$.next(value);
  }

  get searchText() {
    return this.searchText$;
  }

  //#endregion

  //#region Angular

  constructor(
    private changeDetector: ChangeDetectorRef,
    public elementRef: ElementRef,
  ) {}

  ngOnInit() {}

  //#endregion

  //#region ControlValueAccessor

  /** Writes a new value to the element. */
  writeValue(obj: any | any[]): void {
    this.rawNgModel$ = obj;
    if (this.multiple) {
      this.selectedItem$ = obj && this.items ? this.items.filter((item) => obj.indexOf(this.valueRef$(item)) > -1) : [];
    } else {
      this.selectedItem$ = this.items && this.items.find((item) => this.valueRef$(item) === obj);
    }
    this.changeDetector.markForCheck();
  }

  /** Model callback вызовется когда модель измениться из ui */
  onChange: (value: any) => void = () => {};

  /** Registers a callback function that should be called when the control's value changes in the UI */
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  onTouched = () => {};

  /** Registers a callback function that should be called when the control receives a blur event. */
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  /** This function is called by the forms API when the control status changes to or from "DISABLED". */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.changeDetector.markForCheck();
  }

  //#endregion

  //#region Открытие, закрытие

  toggle() {
    this.panelOpen ? this.close() : this.open();
  }

  open() {
    if (this.disabled) {
      return;
    }
    if (this.panelOpen) {
      return;
    }
    this.panelOpen$ = true;
    this.changeDetector.markForCheck();
    if (this.hasSearch) {
      this.searchTextSubscription$ = this.searchTextSub$.pipe(debounceTime(300)).subscribe((text) => this.search(text));

      setTimeout(() => {
        this.searchInput$?.nativeElement.focus();
      }, 0);
    }
  }

  close() {
    // if (this.alwaysOpen) {
    //   return;
    // }
    if (this.panelOpen) {
      this.panelOpen$ = false;
      this.focusedIndex$ = null;
      this.changeDetector.markForCheck();
      if (this.hasSearch) {
        this.elementRef.nativeElement.focus();
        this.searchText$ = '';
      }
      if (this.searchTextSubscription$) {
        this.searchTextSubscription$.unsubscribe();
        this.searchTextSubscription$ = null;
      }
    }
  }

  //#endregion

  //#region Отображение

  getText(item: any) {
    return this.textPath$ ? this.fetchFromObject(item, this.textPath$) : item;
  }

  getInlineMulti() {
    return this.selectedItem$.map((s: any) => this.getText(s));
  }

  private fetchFromObject(obj: any, prop: string): any {
    if (typeof obj === 'undefined') {
      return null;
    }

    const index = prop.indexOf('.');
    if (index > -1) {
      return this.fetchFromObject(obj[prop.substring(0, index)], prop.substr(index + 1));
    }

    return obj[prop];
  }

  get viewType() {
    if (!this.hasValue) {
      return this.placeholder instanceof TemplateRef ? ViewType.notSelectedTemplate : ViewType.notSelected;
    }

    if (this.multiple) {
      if (this.selectedRef === 'block') {
        return ViewType.block;
      }

      if (this.selectedRef instanceof TemplateRef) {
        return ViewType.templateMulti;
      }

      return ViewType.inlineMulti;
    } else {
      if (this.selectedRef instanceof TemplateRef) {
        return ViewType.template;
      }

      return ViewType.inline;
    }
  }

  //#endregion

  //#region Выбор

  _select(item: any) {
    if (this.disabled) {
      return;
    }
    if (this.multiple) {
      const index = this.selectedItem$.indexOf(item);
      if (index > -1) {
        this.selectedItem$.splice(index, 1);
      } else {
        this.selectedItem$.push(item);
      }
      this.rawNgModel$ = this.selectedItem$.map((i: any) => this.valueRef$(i));
    } else {
      this.selectedItem$ = item;
      this.close();
      this.rawNgModel$ = this.valueRef$(this.selectedItem$);
    }
    this.onChange(this.rawNgModel$);
    this.changeDetector.markForCheck();
  }

  _isSelected(item: any) {
    if (this.multiple) {
      return this.selectedItem$.indexOf(item) > -1;
    } else {
      return this.selectedItem$ === item;
    }
  }

  get hasValue() {
    return this.multiple ? this.selectedItem$.length > 0 : this.selectedItem$ !== null && typeof this.selectedItem$ !== 'undefined';
  }

  clear(event: MouseEvent) {
    if (this.multiple) {
      this.selectedItem$.splice(0);
      this.rawNgModel$ = [];
      this.onChange(this.rawNgModel$);
      this.changeDetector.markForCheck();
    } else {
      this._select(undefined);
    }
    event.stopPropagation();
  }

  //#endregion

  //#region Фокус

  @HostListener('focus', ['$event'])
  focusHandler(event: FocusEvent) {
    this.focused$ = true;
  }

  @HostListener('focusout', ['$event'])
  focusoutHandler(event: FocusEvent) {
    if (this.panelOpen) {
      return;
    }
    if ((this.focused$ && !event.relatedTarget) || !this._isDescendant(this.elementRef.nativeElement, event.relatedTarget)) {
      this.focused$ = false;
      this.close();
      this.onTouched();
    }
  }

  searchFocusout(event: FocusEvent) {
    this.focusoutHandler(event);
  }

  private _isDescendant(parent: any, child: any) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }

  //#endregion

  //#region Поиск

  private search(searchText: string | null) {
    if (!this.items) {
      return;
    }
    this.searchText$ = searchText;
    if (!searchText || !searchText.trim()) {
      this.viewItems$ = this.items;
      this.changeDetector.markForCheck();
      return;
    }
    let getSearchStr: any;
    switch (typeof this.searchRef) {
      case 'string':
        getSearchStr = (item: any) => this.fetchFromObject(item, this.searchRef as string);
        break;

      case 'function':
        getSearchStr = this.searchRef;
    }

    const pattern = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
    const searchWithOutRegExp = searchText
      .toLowerCase()
      .replace(pattern, '\\$&')
      .split(' ')
      .filter((t) => t.length > 0)
      .map((t) => `(?=.*${t})`)
      .join('');

    this.viewItems$ = this.items.filter((item) => getSearchStr(item)?.search(new RegExp(searchWithOutRegExp, 'i')) > -1);

    this.changeDetector.markForCheck();
  }

  //#endregion

  //#region Клавиатура
  @HostListener('keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey || event.altKey) {
      return;
    }
    // заглушаем управляющие клавиши, имеющие смысл для компонента (кроме esc/enter)
    // не заглушаем ввод
    let eventSilenced = true;
    const key = event.code || event.key;
    switch (key) {
      case 'Escape':
      case 'Esc':
        eventSilenced = false;
        this.close();
        break;

      case 'Tab':
        eventSilenced = false;
        // иначе первое нажатие только закроет выпадающий список
        if (this.panelOpen) {
          this.close();
        }
        break;

      case 'Space':
      case 'Spacebar':
        if (this.panelOpen) {
          if (this.focusedIndex$ !== null && !this.hasSearch) {
            this._select(this.viewItems$[this.focusedIndex$]);
          } else {
            eventSilenced = false;
          }
        } else {
          this.open();
        }
        break;

      case 'Enter':
        if (this.panelOpen) {
          if (this.hasSearch && this.searchText$ && this.viewItems$.length > 0 && this.focusedIndex$ === null) {
            this._select(this.viewItems$[0]);
            eventSilenced = false;
            return;
          }
          if (this.focusedIndex$ !== null) {
            this._select(this.viewItems$[this.focusedIndex$]);
          }
          if (!this.multiple$) {
            eventSilenced = false;
          }
        } else {
          this.open();
        }
        break;

      case 'ArrowUp':
      case 'Up':
        if (!this.panelOpen) {
          this.open();
          break;
        }
        if (this.viewItems$.length > 0) {
          if (this.focusedIndex$ === null) {
            this.focusedIndex$ = 0;
          } else {
            if (this.focusedIndex$ > 0) {
              if (event.shiftKey) {
                this._select(this.viewItems$[this.focusedIndex$]);
              }
              this.focusedIndex$--;
            }
          }
          this.scrollTo(this.focusedIndex$);
        }
        break;

      case 'ArrowDown':
      case 'Down':
        if (!this.panelOpen) {
          this.open();
          break;
        }
        if (this.viewItems$.length > 0) {
          if (this.focusedIndex$ === null) {
            this.focusedIndex$ = 0;
          } else {
            if (this.viewItems$.length > this.focusedIndex$ + 1) {
              if (event.shiftKey) {
                this._select(this.viewItems$[this.focusedIndex$]);
              }
              this.focusedIndex$++;
            }
          }
          this.scrollTo(this.focusedIndex$);
        }
        break;
      default:
        if (event.key.length === 1) {
          if (!(this.hasSearch && this.searchInput$?.nativeElement === document.activeElement)) {
            if (!this.panelOpen) {
              this.open();
            } else {
              this.searchInput$?.nativeElement.focus();
            }
            // note: иначе не успевает учесть
            this.searchText$ = event.key;
            this.searchText = event.key;
          }
        }
        eventSilenced = false;
    }

    if (eventSilenced) {
      event.cancelBubble = true;
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      return false;
    }
    return true;
  }

  private scrollTo(index: number) {
    if (this.virtualViewport$) {
      this.virtualViewport$.scrollToIndex(index - 5);
    }
  }

  //#endregion
}
