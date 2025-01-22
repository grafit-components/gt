import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItskDropdownComponent } from '../../itsk-dropdown/itsk-dropdown/itsk-dropdown.component';
import { ItskDropdownHeadDirective } from '../../itsk-dropdown/itsk-dropdown-head.directive';
import { ItskDropdownContentDirective } from '../../itsk-dropdown/itsk-dropdown-content.directive';
import { NgIf, AsyncPipe } from '@angular/common';
import { ItskMarkDirective } from '../../itsk-shared/itsk-mark.directive';

@Component({
    selector: 'itsk-autocomplete',
    templateUrl: './itsk-autocomplete.component.html',
    styleUrls: ['./itsk-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ItskAutocompleteComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskDropdownComponent, ItskDropdownHeadDirective, FormsModule, ItskDropdownContentDirective, NgIf, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, ItskMarkDirective, AsyncPipe]
})
export class ItskAutocompleteComponent implements ControlValueAccessor, OnInit {
  private items: string[] = [];

  private get itemsCount() {
    return this.items.length;
  }

  private inputValue$ = new BehaviorSubject<string>('');
  items$: Observable<string[] | null> = this.inputValue$.pipe(
    map((inputValue) => {
      if (this.values?.length) {
        if (!inputValue) {
          this.items = this.values;
        } else {
          const pattern = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
          const searchWithOutRegExp = inputValue
            .toLowerCase()
            .replace(pattern, '\\$&')
            .split(' ')
            .filter((t) => t.length > 0)
            .map((t) => `(?=.*${t})`)
            .join('');

          this.items = this.values.filter((item) => item?.search(new RegExp(searchWithOutRegExp, 'i')) > -1);
        }

        this.focusedIndex = null;

        const itemsCount = this.items.length;
        if (!itemsCount) {
          return null;
        }

        this.height = itemsCount > this.itemScrollCount ? this.itemSize * this.itemScrollCount : this.itemSize * itemsCount;
        return this.items;
      }
      return null;
    }),
  );

  focusedIndex: null | number = null;
  value?: string;

  @HostBinding('class.select')
  selectClass = true;

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  private virtualViewport?: CdkVirtualScrollViewport;

  @Input()
  panelOpen: boolean = false;
  @Input()
  fixed: boolean = false;

  /** Высота в `px` элемента выпадающего списка */
  itemSize = 32;

  /** Максимальное коллчество элементов прокруктки */
  @Input()
  itemScrollCount = 8;

  /** Максимальная высота области прокрутки */
  height = this.itemSize * this.itemScrollCount;

  /** Значения для подсказки */
  @Input()
  values?: string[];

  /** Недоступно для измения */
  @Input()
  disabled: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  writeValue(obj: string): void {
    this.value = obj;
    this.cdr.markForCheck();
  }

  //endregion

  inputChange(value: string) {
    this.inputValue$.next(value);
    this.onChange(value);
  }

  @HostListener('keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey || event.altKey) {
      return;
    }
    let eventSilenced = true;
    const key = event.code || event.key;
    switch (key) {
      case 'Escape':
      case 'Esc':
      case 'Tab':
        eventSilenced = false;
        this.panelOpen = false;
        break;

      case 'ArrowUp':
      case 'Up':
        if (!this.panelOpen) {
          this.panelOpen = true;
          this.focusedIndex = 0;
          break;
        }
        if (this.itemsCount > 0) {
          if (this.focusedIndex === null) {
            this.focusedIndex = 0;
          } else {
            if (this.focusedIndex > 0) {
              this.focusedIndex--;
            }
          }
          this.scrollTo(this.focusedIndex);
        }
        break;

      case 'ArrowDown':
      case 'Down':
        if (!this.panelOpen) {
          this.panelOpen = true;
          this.focusedIndex = 0;
          break;
        }
        if (this.itemsCount > 0) {
          if (this.focusedIndex === null) {
            this.focusedIndex = 0;
          } else {
            if (this.itemsCount > this.focusedIndex + 1) {
              this.focusedIndex++;
            }
          }
          this.scrollTo(this.focusedIndex);
        }
        break;

      case 'Enter':
        if (this.panelOpen) {
          this.panelOpen = false;
          if (this.focusedIndex !== null) {
            this.value = this.items[this.focusedIndex];
            this.onChange(this.value);
          }
        } else {
          this.panelOpen = true;
        }
        break;

      default:
        this.panelOpen = true;
    }
  }

  private scrollTo(index: number) {
    if (this.virtualViewport) {
      this.virtualViewport.scrollToIndex(index - 5);
    }
  }

  select(item: string) {
    this.value = item;
    this.panelOpen = false;
    this.focusedIndex = null;
    this.onChange(item);
  }
}
