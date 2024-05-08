export class DateUtil {
  /** Получить дату из строки */
  public static ParseString(dat: string) {
    const from = dat.split('.');
    const parsedDate = new Date(parseInt(from[2], 10), parseInt(from[1], 10) - 1, parseInt(from[0], 10));
    if (isNaN(parsedDate.getTime())) {
      return null;
    }
    return parsedDate;
  }

  /** Привести дату к строке */
  public static ToString(dat: Date) {
    if (!dat || !(dat instanceof Date)) {
      return '';
    }
    const month = dat.getMonth() + 1;
    const montString = month < 10 ? '0' + month.toString() : month.toString();
    return dat.getDate().toString() + '.' + montString + '.' + dat.getFullYear().toString();
  }

  /** Подготовка даты к отправке на сервер, чтобы небыло смещения часов */
  public static ConvertUTC2DateLocal(date?: Date): Date | null {
    if (date && date instanceof Date) {
      const timezoneOffsetMs: number = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTimezoneOffset() * 60000;
      return new Date(date.getTime() - timezoneOffsetMs);
    }
    return null;
  }

  /** Подготовка даты к отправке на сервер, чтобы небыло смещения часов */
  public static ConvertDateLocal2UTC(date?: Date): Date | null {
    if (date && date instanceof Date) {
      const timezoneOffsetMs: number = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTimezoneOffset() * 60000;
      return date == null ? null : new Date(date.getTime() + timezoneOffsetMs);
    }
    return null;
  }

  public static ConvertDateStringsToDates(input: any): any {
    const regexIso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
    if (typeof input === 'string' && regexIso8601.test(input)) {
      return DateUtil.convertStringToLocalDate(input);
    }
    if (typeof input !== 'object' || !input) {
      return input;
    }
    let res: any | any[];
    if (input instanceof Array) {
      res = [];
    } else {
      res = {};
    }
    return DateUtil.fillConvertDateStringsToDates(res, input);
  }

  private static fillConvertDateStringsToDates(result: any, input: any): any {
    const regexIso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
    for (const key in input) {
      if (!input.hasOwnProperty(key)) {
        continue;
      }
      const value = input[key];
      if (typeof value === 'string' && regexIso8601.test(value)) {
        result[key] = DateUtil.convertStringToLocalDate(value);
      } else if (typeof value === 'object') {
        result[key] = DateUtil.ConvertDateStringsToDates(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  private static convertStringToLocalDate(dateString: string) {
    const milliseconds = Date.parse(dateString);
    if (!isNaN(milliseconds)) {
      const dt = new Date(milliseconds);
      return DateUtil.ConvertDateLocal2UTC(dt);
    }
    return dateString;
  }

  public static ConvertDates(input: any | any[]): any | any[] {
    if (typeof input !== 'object' || !input) {
      return input;
    }
    if (input instanceof Date) {
      return DateUtil.ConvertUTC2DateLocal(input);
    }
    let res: any | any[];
    if (input instanceof Array) {
      res = [];
    } else {
      res = {};
    }
    return DateUtil.fillConvertDates(res, input);
  }

  private static fillConvertDates(result: any, input: any): any {
    for (const key in input) {
      if (!input.hasOwnProperty || !input.hasOwnProperty(key)) {
        continue;
      }
      if (input.hasOwnProperty(key)) {
        let value = input[key];
        if (value instanceof Date) {
          if (value !== null && value !== undefined) {
            value = DateUtil.ConvertUTC2DateLocal(value);
          }
          result[key] = value;
        } else if (typeof value === 'object') {
          result[key] = DateUtil.ConvertDates(value);
        } else {
          result[key] = value;
        }
      }
    }
    return result;
  }

  public static GetMonthDaysCount(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  // Возвращает список месяцев между двумя датами
  public static GetRangeOfMonths(start: Date, end: Date) {
    if (start > end || !start || !end) {
      return null;
    }
    const resDates = [];
    let i = 0;
    let dateTmp = new Date(start.getFullYear(), start.getMonth() + i, 1);
    while (end >= dateTmp) {
      resDates.push(dateTmp);
      i++;
      dateTmp = new Date(start.getFullYear(), start.getMonth() + i, 1);
    }
    return resDates;
  }

  public static TruncateToMonth(date: Date) {
    const res = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
    return res;
  }

  public static ToISOString(date: number): string {
    return new Date(date - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -5) + 'Z';
  }
}
