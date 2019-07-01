"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var operators_1 = require("rxjs/operators");
function getTakeUntil(target, value) {
    if (!target.destroy$) {
        return value;
    }
    return value.pipe(operators_1.takeUntil(target.destroy$));
}
function propertyDestroy(target, key) {
    var _value;
    Object.defineProperty(target, key, {
        configurable: false,
        get: function () { return getTakeUntil(target, _value); },
        set: function (value) { return (_value = value); },
    });
}
function methodDestroy(target, key, descriptor) {
    descriptor.value = getTakeUntil(target, descriptor.value);
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        return getTakeUntil(target, originalMethod.apply(this));
    };
    return descriptor;
}
function Destroy(target, key, descriptor) {
    if (descriptor) {
        return methodDestroy(target, key, descriptor);
    }
    else {
        return propertyDestroy(target, key);
    }
}
exports.Destroy = Destroy;
