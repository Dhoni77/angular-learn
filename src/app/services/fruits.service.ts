import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface Fruits {
  id: number;
  name: string;
}

const Fruits: Fruits[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Mango' }
];

@Injectable({
  providedIn: 'root'
})
export class FruitsService {
  constructor(private http: HttpClient) {}

  private Fruits$: BehaviorSubject<Fruits[]> = new BehaviorSubject<Fruits[]>(
    Fruits
  );

  getFruits() {
    return this.Fruits$;
  }

  getFruitsById(id: number | string): Observable<Fruits> {
    return this.getFruits().pipe(
      map((d) => d.find((Fruits) => Fruits.id === +id)!)
    );
  }
}
