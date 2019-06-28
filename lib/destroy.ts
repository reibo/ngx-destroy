import 'reflect-metadata';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

function getTakeUntil(target, value) {
  if (!target.destroy$) {
    return value;
  }
  return value.pipe(takeUntil(target.destroy$));
}

function propertyDestroy(target: any, key: string) {
  let _value: Observable<any>;
  Object.defineProperty(target, key, {
    configurable: false,
    get: () => getTakeUntil(target, _value),
    set: value => (_value = value),
  });
}

function methodDestroy(target: any, key: string, descriptor: any) {
  descriptor.value = getTakeUntil(target, descriptor.value);
  const originalMethod = descriptor.value;
  descriptor.value = function() {
    return getTakeUntil(target, originalMethod.apply(this));
  };
  return descriptor;
}

export function Destroy(target: any, key: string, descriptor?: any) {
  if (descriptor) {
    return methodDestroy(target, key, descriptor);
  } else {
    return propertyDestroy(target, key);
  }
}
