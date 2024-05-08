export type BooleanFunc<T> = (args: T) => boolean;
export type BooleanPromiseFunc<T> = (args: T) => Promise<boolean>;

export function isFunction(obj: any) {
  return !!(obj && obj?.constructor && obj?.call && obj?.apply);
}

export function isPromise(obj: any) {
  return typeof obj?.then === 'function';
}

export function boolFuncOrPromiseCallback<T>(variable: boolean | BooleanFunc<T> | BooleanPromiseFunc<T>, callback: any) {
  return (args: T) => {
    if (typeof variable === 'boolean' && variable) {
      callback(args);
    } else if (isFunction(variable) && (variable as BooleanFunc<T>)(args)) {
      callback(args);
    } else if (isPromise(variable)) {
      (variable as BooleanPromiseFunc<T>)(args).then((result: boolean) => {
        if (result) {
          callback(args);
        }
      });
    }
  };
}
