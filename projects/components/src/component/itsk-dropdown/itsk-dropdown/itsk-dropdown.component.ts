import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {ItskAlign} from '../../../common/model/itsk-align.enum';
import {ItskDropdownContentDirective} from '../itsk-dropdown-content.directive';
import {ItskDropdownHeadDirective} from '../itsk-dropdown-head.directive';
import {
  findScrollableParentX,
  findScrollableParentY,
  findTransformedParent,
  getRealPosition
} from '../../../util/dom-util';
import {BooleanFunc, BooleanPromiseFunc, boolFuncOrPromiseCallback} from '../../../util/object-util';
import {ClickOutsideBase} from '../../../directive/itsk-click-outside/click-outside-base';

@Component({
  selector: 'itsk-dropdown',
  templateUrl: './itsk-dropdown.component.html',
  styleUrls: ['./itsk-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskDropdownComponent extends ClickOutsideBase implements OnInit, OnDestroy {
  @HostBinding('class.dropdown') classDropdown = true;

  @ContentChild(ItskDropdownContentDirective, {static: true}) content: ItskDropdownContentDirective;
  @ContentChild(ItskDropdownHeadDirective, {static: true}) head: ItskDropdownHeadDirective;

  @Input() align: ItskAlign.Left | ItskAlign.Right = ItskAlign.Left;
  @Input() fixed = false;

  @Input()
  set open(val: boolean) {
    this.setOpen(val);
  }

  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  canOpen: boolean | BooleanFunc<void> | BooleanPromiseFunc<void> = true;

  @Input()
  canClose: boolean | BooleanFunc<void> | BooleanPromiseFunc<void> = true;

  @Input()
  autoClose = true;

  visible: boolean;
  ItskAlign = ItskAlign;
  top: number | null;
  bottom: number | null;
  left: number | null;
  right: number | null;
  minWidth: number | null;

  private scrollXParentElement$: HTMLElement | null;
  private scrollYParentElement$: HTMLElement | null;

  constructor(private element$: ElementRef,
              private cdr$: ChangeDetectorRef) {
    super(element$.nativeElement);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unRegisterOnScrollParent();
    this.removeListener(false);
  }

  toggle(visible: boolean) {
    if (visible) {
      boolFuncOrPromiseCallback(this.canOpen, () => {
        this.openChange.emit(visible);
        this.setOpen(visible);
      })();
    } else {
      boolFuncOrPromiseCallback(this.canClose, () => {
        this.openChange.emit(visible);
        this.setOpen(visible);
      })();
    }
  }

  private setOpen(visible: boolean) {
    this.visible = visible;
    if (visible) {
      this.addListener(false);
      this.setPosition();
      if (this.fixed) {
        this.registerOnScrollParent();
      }
    } else {
      this.removeListener(false);
      this.unRegisterOnScrollParent();
    }
    this.cdr$.detectChanges();
  }

  private onScrollParent = () => {
    this.unRegisterOnScrollParent();
    this.openChange.emit(false);
    this.setOpen(false);
    this.cdr$.detectChanges();
  };

  private unRegisterOnScrollParent = () => {
    if (this.scrollYParentElement$) {
      this.scrollYParentElement$.removeEventListener('scroll', this.onScrollParent);
      this.scrollYParentElement$ = null;
    }
    if (this.scrollXParentElement$) {
      this.scrollXParentElement$.removeEventListener('scroll', this.onScrollParent);
      this.scrollXParentElement$ = null;
    }
  };

  private registerOnScrollParent = () => {
    if (!this.autoClose) {
      return;
    }
    this.unRegisterOnScrollParent();
    this.scrollYParentElement$ = findScrollableParentY(this.element$.nativeElement);
    if (this.scrollYParentElement$) {
      this.scrollYParentElement$.addEventListener('scroll', this.onScrollParent);
    }
    this.scrollXParentElement$ = findScrollableParentX(this.element$.nativeElement);
    if (this.scrollXParentElement$) {
      this.scrollXParentElement$.addEventListener('scroll', this.onScrollParent);
    }
  };

  private setPosition() {
    if (!this.fixed) {
      this.top = null;
      this.left = null;
      this.bottom = null;
      this.right = null;
      this.minWidth = null;
      return;
    }

    const rect = getRealPosition(this.element$.nativeElement);
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    this.minWidth = rect.width;
    let bottom = pageHeight - rect.top;
    let right = pageWidth - rect.left - rect.width;
    let top = rect.bottom;
    let left = rect.left;
    const transformedParent = findTransformedParent(this.element$.nativeElement);
    if (transformedParent) {
      const parentPosition = getRealPosition(transformedParent);
      left = rect.left - parentPosition.left;
      top = rect.bottom - parentPosition.top;
      bottom = parentPosition.bottom - rect.top;
      right = parentPosition.right - rect.right;
    }
    if (rect.top < 0.6 * pageHeight) {
      this.top = top;
      this.bottom = null;
    } else {
      this.top = null;
      this.bottom = bottom;
    }
    if (rect.left < 0.6 * pageWidth) {
      this.left = left;
      this.right = null;
    } else {
      this.left = null;
      this.right = right;
    }

  }

  clickedOutside = (click: MouseEvent) => {
    if (this.autoClose) {
      this.toggle(false);
    }
  };
}
