import {takeWhile} from 'rxjs/operators';
import {MonoTypeOperatorFunction} from 'rxjs';

const isFn = (fn: any) => typeof fn === 'function';

export function takeWhileAlive<T>(component: any): MonoTypeOperatorFunction<T> {
  return takeWhile<T>(() => component.__isNotDestroyed);
}

/**
 * Clears subscriptions, use with takeWhileAlive
 */
export function ItskAutoUnsubscribe() {
  return (target: any) => {
    const onDestroy = target.prototype.ngOnDestroy;
    console.log(target);
    if (!isFn(onDestroy)) {
      throw new Error('@ItskAutoUnsubscribe on class that does not implement OnDestroy');
    }
    target.prototype.__isNotDestroyed = true;
    target.prototype.ngOnDestroy = function() {
      if (isFn(onDestroy)) {
        onDestroy.apply(this, arguments);
      }
      this.__isNotDestroyed = false;
    };
  };
}
