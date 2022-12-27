import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface People {
  id: string;
  name: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  peopleUrl: string = 'api/peoples';

  constructor(private http: HttpClient) {}

  getPeopleFromUrl(): Observable<People[]> {
    return this.http.get<People[]>(this.peopleUrl);
  }

  addPeople(people: People): Observable<People> {
    return this.http.post<People>(this.peopleUrl, people, httpOptions);
  }

  deletePeople(id: string): Observable<unknown> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  updatePeople(people: People): Observable<People> {
    return this.http.put<People>(this.peopleUrl, people, httpOptions);
  }
}
