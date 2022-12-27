import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService extends InMemoryDbService {

createDb() {
  const peoples = [
    {id: 'a', name: 'John'},
    {id: 'b', name: 'Bran'},
    {id: 'c', name: 'Bob'},
    {id: 'd', name: 'Monty'},
    {id: 'e', name: 'David'},
  ]

  const query = [
    { name: '@angular/core', version: '20.1.0', description: 'angular core package' },
    { name: '@angular/common', version: '20.1.0', description: 'angular common package' },
    { name: '@angular/material', version: '20.1.5', description: 'angular material package' },
  ];
  return {peoples, query};
}
}
