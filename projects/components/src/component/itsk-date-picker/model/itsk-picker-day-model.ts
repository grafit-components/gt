export class ItskPickerDayModel {
  disabled: boolean = false;
  isCurrentMonth: boolean = false;
  today: boolean = false;
  selected: boolean = false;
  date?: Date;
  weekend: boolean = false;

  public constructor(options?: {
    disabled?: boolean;
    isCurrentMonth?: boolean;
    today?: boolean;
    selected?: boolean;
    date: Date;
    weekend?: boolean;
  }) {
    if (options) {
      this.disabled = options.disabled || false;
      this.isCurrentMonth = options.isCurrentMonth || false;
      this.today = options.today || false;
      this.selected = options.selected || false;
      this.date = options.date;
      this.weekend = options.weekend || false;
    }
  }
}
