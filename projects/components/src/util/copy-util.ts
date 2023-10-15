export class CopyUtil {
  public static Copy(target: any, source: any) {
    for (const property in source) {
      if (source.hasOwnProperty(property)) {
        if (typeof source[property] === 'object' && (!(source[property] instanceof Date) && source[property])) {
          if (!target[property]) {
            target[property] = {};
          }
          CopyUtil.Copy(target[property], source[property]);
        } else {
          target[property] = source[property];
        }
      }
    }
  }
}
