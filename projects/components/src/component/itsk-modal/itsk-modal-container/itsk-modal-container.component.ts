import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {ItskModalConfig} from '../model/itsk-modal-config';
import {IModalResult} from '../model/imodal-result';
import {ItskModalCloseReason} from '../model/itsk-modal-close-reason.enum';

@Component({
  selector: 'itsk-modal-container',
  templateUrl: './itsk-modal-container.component.html',
  styleUrls: ['./itsk-modal-container.component.scss']
})
export class ItskModalContainerComponent implements OnInit {
  @Input() config: ItskModalConfig;
  @Output() closeEvent = new EventEmitter<IModalResult>();

  @HostBinding('attr.tabindex') tabindex = -1;

  @HostBinding('class')
  get classList() {
    const classList = ['modal__window'];
    if (this.config) {
      if (this.config && this.config.class) {
        classList.push(...this.config.class);
      }
      if (this.config.backdrop) {
        classList.push('modal__backdrop');
      }
    }
    return classList.join(' ');
  }

  @HostListener('keyup', ['$event']) keyup(event: KeyboardEvent) {
    if (this.config && this.config.esc && !event.defaultPrevented) {
      const key = event.key || event.keyCode;

      if (key === 'Escape' || key === 'Esc' || key === 27) {
        this.closeEvent.emit({
          reason: ItskModalCloseReason.Esc
        });
      }
    }
  }

  @HostListener('click', ['$event']) click(event: MouseEvent) {
    if (this.config.backdrop === true && this.elRef$.nativeElement === event.target) {
      this.closeEvent.emit({
        reason: ItskModalCloseReason.Backdrop
      });
    }
  }

  constructor(private elRef$: ElementRef) {
  }

  ngOnInit() {
  }
}
