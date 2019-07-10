# ngx-destroy

[![npm](https://img.shields.io/npm/v/%40reibo%2Fngx-destroy.svg?style=flat-square)](https://www.npmjs.com/package/%40reibo%2Fngx-destroy)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![npm](https://img.shields.io/npm/dt/%40reibo%2Fngx-destroy.svg?style=flat-square)](https://www.npmjs.com/package/%40reibo%2Fngx-destroy)


[![CircleCI](https://img.shields.io/circleci/project/github/reibo/ngx-destroy.svg)](https://circleci.com/gh/reibo/ngx-destroy)
[![CircleCI](https://img.shields.io/codecov/c/github/reibo/ngx-destroy.svg)](https://codecov.io/gh/reibo/ngx-destroy)


[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


> Don't forget to unsubscribe

If we start working with Rxjs, we need to be aware to unsubscribe add a certain point.

In an angular application we can do this on different ways:
 - async pipe
 - takeUntil
 - take
 - ...

We prefer to use the async pipe in our code. But this is not always possible, so we create a lot of boilerplate code.
To avoid this, you can use this library.

## Install it
```bash
yarn add @reibo/ngx-destroy 
npm i @reibo/ngx-destroy
```

## How to use it?
1. you need to add the `@DestroyClass` to the class, that needs to be destroyed
2. Add `@Destroy` to your field or function that needs to be destroyed.


##Examples
See the stackblitz example: (https://stackblitz.com/edit/ngx-destroy)
### Usage on an angular component 
#### Without implementing OnDestroy
```typescript
import {Component} from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';
import {Destroy, DestroyClass} from '@reibo/ngx-destroy'

@DestroyClass
@Component({
    selector: 'app-destroy',
    templateUrl: './destroy.component.html',
    styleUrls: ['./destroy.component.css']
})
export class DestroyComponent {
    @Destroy
    stream$ = interval(1000).pipe(
        map(() => `property ${new Date()}`),
    );
    
    @Destroy
    getStreamTest() {
        return interval(1000).pipe(
            map(() => `function ${new Date()}`),
        );
    }

    constructor() {
        this.stream$.subscribe();
         this.getStreamTest().subscribe(console.log);
    }
}

```
#### With implementing OnDestroy

```typescript
import {Component, OnDestroy} from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';
import {Destroy, DestroyClass} from '@reibo/ngx-destroy'

@DestroyClass
@Component({
    selector: 'app-destroy',
    templateUrl: './destroy.component.html',
    styleUrls: ['./destroy.component.css']
})
export class DestroyComponent implements  OnDestroy {
    @Destroy
    stream$ = interval(1000).pipe(
        map(() => `property ${new Date()}`),
    ); 
    
    @Destroy
    getStreamTest() {
        return interval(1000).pipe(
            map(() => `function ${new Date()}`),
        );
    }

    constructor() {
        this.stream$.subscribe();
         this.getStreamTest().subscribe(console.log);
    } 

    ngOnDestroy() {
        console.log('destroy')
    }
}

```
