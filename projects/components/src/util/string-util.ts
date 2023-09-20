export class StringUtil {
  public static Format(template: string, ...args: any[]): string {
    const res = template.replace(/{(\d)}/g, (match, subgroup) => {
      const index = Number(subgroup);
      return args[index];
    });
    return res;
  }

  public static UrlEncode(input: string): string {
    const res = encodeURIComponent(input).replace(/'/g, '%27').replace(/"/g, '%22');
    return res;
  }
}
