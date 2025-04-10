import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';


@Component({
    selector: 'itsk-year-selector',
    templateUrl: './itsk-year-selector.component.html',
    styleUrls: ['./itsk-year-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class ItskYearSelectorComponent implements OnInit, OnDestroy {
  @Input() currentYear?: number;
  @Input() today?: Date;
  @Input() size?: number;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() allowableRange: number[] = [1900, 2100];
  @Output() yearSelected = new EventEmitter<number>();
  @Output() yearApplied = new EventEmitter<number>();

  minYearDate?: Date;
  maxYearDate?: Date;
  years?: number[];
  minYearList?: number[];
  maxYearList?: number[];
  decreaseInterval?: number;
  increaseInterval?: number;

  constructor() {}

  ngOnInit() {
    const [minRange, maxRange] = this.allowableRange;
    this.minYearDate = new Date(minRange, 0, 1);
    this.maxYearDate = new Date(maxRange, 11, 31);
    this.initMinYearList();
    this.initMaxYearList();
    this.initYearSelector(this.currentYear);
  }

  ngOnDestroy() {
    window.clearInterval(this.decreaseInterval);
    window.clearInterval(this.increaseInterval);
  }

  scrollYearSelector = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const step = e.deltaY > 0 ? 1 : -1;
    this.shiftYearSelector(step);
  };

  setYear = (e: any, year: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isYearDisabled(year)) {
      this.yearSelected.emit(year);
    }
  };

  applyYear = (e: any, year: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isYearDisabled(year)) {
      this.yearApplied.emit(year);
    }
  };

  initYearSelector = (year?: number) => {
    if (!year) {
      year = this.today?.getFullYear() ?? 0;
    }
    this.years = [year];
    let direction = false;
    for (let i = 1; i < (this.size ?? 0); i++) {
      if (direction) {
        this.years.unshift(this.years[0] - 1);
      } else {
        this.years.push(this.years[this.years.length - 1] + 1);
      }
      direction = !direction;
    }
    this.checkRanges();
  };

  initMinYearList = () => {
    const minYearList: any = [this.minYearDate?.getFullYear()];
    this.minYearList = minYearList;
    for (let i = 1; i < (this.size ?? 0); i++) {
      minYearList.push(minYearList[minYearList.length - 1] + 1);
    }
  };

  initMaxYearList = () => {
    const maxYearList: any = [this.maxYearDate?.getFullYear()];
    this.maxYearList = maxYearList;
    for (let i = 1; i < (this.size ?? 0); i++) {
      maxYearList.unshift(maxYearList[0] - 1);
    }
  };

  checkRanges = () => {
    if (
      this.years?.some((year) => {
        const dat = new Date(year, 0, 1);
        return this.isMinYear(dat);
      })
    ) {
      this.years = this.minYearList;
    }
    if (
      this.years?.some((year) => {
        const dat = new Date(year, 0, 1);
        return this.isMaxYear(dat);
      })
    ) {
      this.years = this.maxYearList;
    }
  };

  shiftYearSelector = (step: number = 0) => {
    this.years = this.years?.map((year) => {
      return year + step;
    });
    this.checkRanges();
  };

  decreaseYearSelector = (step: number = 3) => {
    const dat = new Date(this.years ? this.years[0] : 0 - step, 0, 1);
    if (this.isMinYear(dat)) {
      this.years = this.minYearList;
      return;
    }

    this.years = this.years?.map((year) => {
      return year - step;
    });
  };

  increaseYearSelector = (step: number = 3) => {
    const dat = new Date((this.years ? this.years[this.years.length - 1] : 0) + step, 0, 1);
    if (this.isMaxYear(dat)) {
      this.years = this.maxYearList;
      return;
    }
    this.years = this.years?.map((year) => {
      return year + step;
    });
  };

  startLongDecrease = () => {
    window.clearInterval(this.decreaseInterval);
    this.decreaseInterval = window.setInterval(this.decreaseYearSelector, 100);
  };

  stopLongDecrease = () => {
    window.clearInterval(this.decreaseInterval);
  };

  startLongIncrease = () => {
    window.clearInterval(this.increaseInterval);
    this.increaseInterval = window.setInterval(this.increaseYearSelector, 100);
  };

  stopLongIncrease = () => {
    window.clearInterval(this.increaseInterval);
  };

  isMinYear = (dat: Date): boolean => {
    if (!this.minYearDate || !(this.minYearDate instanceof Date) || !dat) {
      return false;
    }
    return this.minYearDate.getFullYear() > dat.getFullYear();
  };

  isMaxYear = (dat: Date): boolean => {
    if (!this.maxYearDate || !(this.maxYearDate instanceof Date) || !dat) {
      return false;
    }
    return this.maxYearDate.getFullYear() < dat.getFullYear();
  };

  isYearDisabled = (year: number) => {
    if (year) {
      const dat = new Date(year, 0, 1);
      return this.isMaxInvalid(dat) || this.isMinInvalid(dat);
    }
    return false;
  };

  isMinInvalid = (dat: Date): boolean => {
    if (!this.minDate || !(this.minDate instanceof Date) || !dat) {
      return false;
    }
    return this.minDate.getFullYear() > dat.getFullYear();
  };

  isMaxInvalid = (dat: Date): boolean => {
    if (!this.maxDate || !(this.maxDate instanceof Date) || !dat) {
      return false;
    }
    return this.maxDate.getFullYear() < dat.getFullYear();
  };
}
