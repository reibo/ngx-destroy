import { Subject } from 'rxjs';

export function DestroyClass<T extends { new (...args: any[]): {} }>(constructor: T) {
  const destroy$ = new Subject();
  const originalOnDestroy = constructor.prototype.ngOnDestroy;
  const originalDestroy = constructor.prototype.destroy;
  Object.defineProperty(constructor.prototype, 'destroy$', {
    configurable: false,
    value: destroy$,
  });
  Object.defineProperty(constructor.prototype, 'ngOnDestroy', {
    configurable: false,
    value: function() {
      if (originalOnDestroy) {
        originalOnDestroy();
      }
      destroy$.next();
    },
  });
  Object.defineProperty(constructor.prototype, 'destroy', {
    configurable: false,
    value: function() {
      if (originalDestroy) {
        originalDestroy();
      }
      destroy$.next();
    },
  });
  return constructor;
}
