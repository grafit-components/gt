import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'itsk-menu-button',
  templateUrl: './itsk-menu-button.component.html',
  styleUrls: ['./itsk-menu-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskMenuButtonComponent implements OnInit {
  @Input() open: boolean;
  @Output() openChange = new EventEmitter<boolean>();
  @ContentChild('[menuButton]', {static: true}) menuButton: ElementRef;

  constructor(private cdr$: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  showMenu(val: boolean) {
    this.open = val;
    this.openChange.emit(val);
    this.cdr$.markForCheck();
  }
}
