import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomPreloadingStrategyService implements PreloadingStrategy {
  constructor() {
    console.log('CustomPreloadingStrategyService constructor');
  }

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    console.log('CustomPreloadingStrategyService preload');

    if (route.data && route.data['preload']) {
      console.log(
        'CustomPreloadingStrategyService data -- ' + route.data['moduleName']
      );
      return fn();
    }
    return of(null);
  }
}
