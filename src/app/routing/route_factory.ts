import { InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

//https://indepth.dev/posts/1471/leveraging-dependency-injection-to-reduce-duplicated-code-in-angular

export const APP_SOME_ID = new InjectionToken<Observable<string>>(
  'stream of id from route param'
);

// this factory function will get value as an observable from route paramMap
// based on the param key you passed in
// if your current route is '/customers/:customerId' then you would call
// routeParamFactory('customerId')
export function routeParamFactory(
  paramKey: string
): (route: ActivatedRoute) => Observable<string | null> {
  return (route: ActivatedRoute): Observable<string | null> => {
    return route.paramMap.pipe(map((param) => param.get(paramKey)));
  };
}
