export class NumberUtil {
  public static isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
}
