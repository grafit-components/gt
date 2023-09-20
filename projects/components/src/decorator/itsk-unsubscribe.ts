const isFn = (fn: any) => typeof fn === 'function';
const doUnsubscribe = (property: any) => {
  if (property && isFn(property.unsubscribe)) {
    property.unsubscribe();
  }
};

/**
 * Clears subscription objects of your component
 */
export function ItskUnsubscribe({watchArrays = false}) {
  return (target: any) => {
    const onDestroy = target.prototype.ngOnDestroy;

    if (!isFn(onDestroy)) {
      throw new Error('@ItskUnsubscribe on class that does not implement OnDestroy');
    }

    target.prototype.ngOnDestroy = function() {
      for (const key in this) {
        if (this.hasOwnProperty(key)) {
          const prop = this[key];
          if (prop instanceof Array && prop.length) {
            prop.forEach((p) => {
              doUnsubscribe(p);
            });
          } else {
            doUnsubscribe(prop);
          }
        }
      }

      if (isFn(onDestroy)) {
        onDestroy.apply(this, arguments);
      }
    };
  };
}
