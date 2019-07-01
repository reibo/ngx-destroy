"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
function DestroyClass(constructor) {
    var destroy$ = new rxjs_1.Subject();
    var originalOnDestroy = constructor.prototype.ngOnDestroy;
    var originalDestroy = constructor.prototype.destroy;
    Object.defineProperty(constructor.prototype, 'destroy$', {
        configurable: false,
        value: destroy$,
    });
    Object.defineProperty(constructor.prototype, 'ngOnDestroy', {
        configurable: false,
        value: function () {
            if (originalOnDestroy) {
                originalOnDestroy();
            }
            destroy$.next();
        },
    });
    Object.defineProperty(constructor.prototype, 'destroy', {
        configurable: false,
        value: function () {
            if (originalDestroy) {
                originalDestroy();
            }
            destroy$.next();
        },
    });
    return constructor;
}
exports.DestroyClass = DestroyClass;
