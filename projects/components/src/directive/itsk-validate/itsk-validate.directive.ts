import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

enum Level {
  error,
  warning,
}

@Directive({ selector: '[itskValidate]' })
export class ItskValidateDirective implements OnInit {
  private _wrap: any;
  private _message: any;

  /* Field has error */
  private _error: boolean = false;

  @Input()
  set error(val: boolean) {
    this._error = val;
    this.validate();
  }

  get error(): boolean {
    return this._error;
  }

  /* Field has warning */
  private _warn: boolean = false;

  @Input()
  set warn(val: boolean) {
    this._warn = val;
    this.validate();
  }

  get warn(): boolean {
    return this._warn;
  }

  @Input() required: boolean = false;
  @Input() errorMessage?: string;
  @Input() warningMessage?: string;
  @Input() disabled: boolean = false;
  @Input() markGood = false;

  @HostBinding('attr.disabled')
  get attrDisabled() {
    return this.disabled;
  }

  @HostBinding('class.error')
  get classError() {
    return this._error;
  }

  @HostBinding('class.warning')
  get classWarning() {
    return this._warn;
  }

  constructor(
    private _el: ElementRef,
    private control: NgControl,
    private _renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.wrap();
    this.validate();
  }

  private validate() {
    this.checkGood();
    if (!this._error) {
      this.removeError();
    }
    if (!this._warn) {
      this.removeWarning();
    }
    if (this._error) {
      this.addError();
      return;
    }
    if (this._warn) {
      this.addWarning();
    }
  }

  private addError() {
    this._el.nativeElement.classList.add('itsk-validate-error');
    this.addMessage(Level.error);
  }

  private removeError() {
    this._el.nativeElement.classList.remove('itsk-validate-error');
    this.removeMessage();
  }

  private addWarning() {
    this._el.nativeElement.classList.add('itsk-validate-warn');
    this.addMessage(Level.warning);
  }

  private removeWarning() {
    this._el.nativeElement.classList.remove('itsk-validate-warn');
    this.removeMessage();
  }

  private addGood() {
    this._el.nativeElement.classList.add('itsk-validate-good');
  }

  private removeGood() {
    this._el.nativeElement.classList.remove('itsk-validate-good');
  }

  private addDisabled() {
    this._renderer.addClass(this._wrap, 'itsk-validate_disabled');
  }

  private removeDisabled() {
    this._renderer.removeClass(this._wrap, 'itsk-validate_disabled');
  }

  private addRequired() {
    this._renderer.addClass(this._wrap, 'input-wrapper_required');
  }

  private removeRequired() {
    this._renderer.removeClass(this._wrap, 'input-wrapper_required');
  }

  private checkGood() {
    if (this.markGood !== true) {
      return;
    }
    if (this._error !== true && this._warn !== true) {
      this.addGood();
    } else {
      this.removeGood();
    }
  }

  private ClearAll() {
    this.removeGood();
    this.removeWarning();
    this.removeError();
  }

  private addMessage(level: Level) {
    if (level === Level.error && (this.errorMessage === null || this.errorMessage === undefined || this.errorMessage.length < 1)) {
      return;
    }
    if (level === Level.warning && (this.warningMessage === null || this.warningMessage === undefined || this.warningMessage.length < 1)) {
      return;
    }
    this.removeMessage();
    this._message = document.createElement('div');
    if (level === Level.error) {
      this._message.classList.add('itsk-validate-error-message');
      this._message.innerHTML = this.errorMessage;
    } else {
      this._message.classList.add('itsk-validate-warning-message');
      this._message.innerHTML = this.warningMessage;
    }
    this._wrap.appendChild(this._message);
  }

  private removeMessage() {
    if (this._message && this._message.parentNode) {
      this._message.parentNode.removeChild(this._message);
    }
  }

  private wrap() {
    const parent = this._el.nativeElement.parentNode;
    this._wrap = this._renderer.createElement('div');
    this._renderer.addClass(this._wrap, 'input-wrapper');
    this._renderer.insertBefore(parent, this._wrap, this._el.nativeElement);
    this._renderer.removeChild(parent, this._el.nativeElement);
    this._renderer.removeAttribute(this._el.nativeElement, 'inputWrapper');
    this._renderer.appendChild(this._wrap, this._el.nativeElement);
    if (this.required) {
      this._renderer.addClass(this._wrap, 'input-wrapper_required');
    }
    if (this._el.nativeElement.nodeName === 'SELECT') {
      this._renderer.addClass(this._wrap, 'input-wrapper_select');
    }
  }
}
