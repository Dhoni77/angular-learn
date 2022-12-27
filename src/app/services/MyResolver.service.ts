import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { Fruits, FruitsService } from './fruits.service';


@Injectable({
  providedIn: 'root'
})
export class MyResolverService implements Resolve<any> {

constructor(private Fruits: FruitsService, private router: Router) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fruits> | Observable<unknown> {
  const id = route.paramMap.get('id')!;

  return this.Fruits.getFruitsById(id).pipe(
    mergeMap(Fruits => {
      if (Fruits) {
        return of(Fruits);
      } else { // id not found
        this.router.navigate(['routing/fruits-list']);
        return EMPTY;
      }
    })
  );
}

}
